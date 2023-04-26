import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { assignRCount, assignrSet, resetRCount, assignIsClicked, assignInsertedId, assignCount, resetCount, assignArrayLen, resetKchar, resetrSet} from '../app/features/counter/CounterSlice'
import './SetnBox.css'

function SetnBox({kbChar}) {

  const [isActive, setIsActive] = React.useState(true)
  const dispatch = useDispatch()
  const r = useSelector((state) => state.userId.r)
  const n = useSelector((state) => state.userId.n)
  const ncount = useSelector((state) => state.userId.ncount)
  const insertedId = useSelector((state) => state.userId.inserted_id)
  let c = useSelector((state) => state.userId.rcount)
  let count = useSelector((state) => state.userId.count)
  let pvar = []
  
  React.useEffect(() =>{
    dispatch(resetCount(0))
    dispatch(resetRCount(0))
    dispatch(resetKchar(""))
  },[])

  const firstFetch = async () =>{
    dispatch(assignIsClicked(false))
    try{
      const resp = await axios.post(
        'https://100050.pythonanywhere.com/permutationapi/api/', {
    'inserted_id': null,
    'nextVariable': `'${kbChar}'`,
    'n':Number(n),
    'r':Number(r),
    'command':"findPermutation"
  })
    pvar = resp.data.permutationsVariables
    dispatch(assignrSet(pvar[0].charAt(1)))
    dispatch(assignInsertedId(resp.data.inserted_id))
    dispatch(assignArrayLen(pvar.length))
    console.log(pvar)
  }catch(err){
    console.log(err.response)
  }
  }

  const firstCase = () =>{
    if(ncount >= Number(n)){
      dispatch(assignRCount(c+1))
    c=c+1
    if(c <= r){
      setIsActive(false)
      firstFetch()
    }else{
      alert(`Not allowed, you can't select more than ${r} variables.`)
    }
    }else{
      alert(`Please select atleast ${n} variables first.`)
    }
  }

  const secondFetch = async () =>{
    dispatch(assignIsClicked(false))
    try{
      const resp = await axios.post(
        'https://100050.pythonanywhere.com/permutationapi/api/', {
    'inserted_id': insertedId,
    'nextVariable': `'${kbChar}'`,
    'n':Number(n),
    'r':Number(r),
    'command':"findPermutation"
  })
    pvar = resp.data.permutationsVariables
    let str = ""
    for(let i=0; i<pvar.length; i++){
        for(let j = 0; j<(pvar[i]).length; j++){
          str=str + (pvar[i][j]).charAt(1)
      }
    }
    
    dispatch(assignrSet(str))
    dispatch(assignArrayLen(pvar.length))
    console.log(str)
  }catch(err){
    console.log(err.response)
  }
  }


  const secondCase = () =>{
    if(ncount >= Number(n)){
      dispatch(assignRCount(c+1))
    c=c+1
    if(c <= r){
      setIsActive(false)
      secondFetch()
    }else{
      alert(`Not allowed, you can't select more than ${r} variables.`)
    }
    }else{
      alert(`Please select atleast ${n} variables first.`)
    }
  }
  const handleClick = () =>{
    count = count + 1 
    dispatch(assignCount(count))
    if(count === 1){
      firstCase()
      dispatch(resetrSet(""))
      dispatch(assignIsClicked(true))
    }else if(count > 1 && count <= r) {
      secondCase()
      dispatch(resetrSet(""))
      dispatch(assignIsClicked(true))
    }else {
      secondCase()
      dispatch(assignIsClicked(false))
    }
  }

  return (
    <div className='setnBox' id={isActive ? '':'active'} onClick={handleClick}>
      {kbChar}
    </div>
  )
}

export default SetnBox
