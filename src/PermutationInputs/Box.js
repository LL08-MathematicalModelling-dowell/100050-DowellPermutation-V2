import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { assignNCount, resetNCount, assignKchar, resetActive, assignActive } from '../app/features/counter/CounterSlice'
import { useDispatch } from 'react-redux'
import './Box.css'

function Box({keyboardChar}) {

  const active = useSelector((state) => state.userId.active)
  const [isActive, setIsActive] = useState(active)
  const dispatch = useDispatch()
  const n = useSelector((state) => state.userId.n)
  let c = useSelector((state) => state.userId.ncount)
  
  React.useState(() =>{
    dispatch(resetNCount(0))
    dispatch(assignActive(true))
  },[])
  const handleCount = () =>{
    dispatch(assignNCount(c+1))
    c=c+1
    if(c <= n){
      setIsActive(false)
      dispatch(assignKchar(keyboardChar))
    }else{
      alert(`Not allowed, you can't select more than ${n} variables.`)
      dispatch(assignKchar(''))
      dispatch(resetActive())
    }
  }
  
  return (
    <div className='box' id={c >n ? active ? '':'activeBox': isActive ? '':'activeBox'} onClick={handleCount}>
      {keyboardChar}
    </div>
  )
}

export default Box
