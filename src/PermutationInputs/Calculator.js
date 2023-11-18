import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import './Calculator.css'
import Box from './Box'
import CharData from './CharData'
import NData from './NData'
import RData from './RData'
import SData from './SData'
import {assignActive, assignIsClicked, assignKchar, resetInsertedId, resetrSet} from '../app/features/counter/CounterSlice'
import SetnBox from './SetnBox'
import SetrBox from './SetrBox'
import SavedBox from './SavedBox'

function Calculator() {

  const [keyboardChars] = React.useState(['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,'`','~','!','@','#','$','%','^','&','*','(',')','<','>','?'])

    const dispatch = useDispatch()
    const n = useSelector((state) => state.userId.n)
    const r = useSelector((state) => state.userId.r)
    const ch = useSelector((state) => state.userId.kchar)
    const rSet = useSelector((state) => state.userId.rSet)
    const arraylen = useSelector((state) => state.userId.arrayLen)
    const isClicked = useSelector((state) => state.userId.isClicked)
    const totalPermutation = useSelector((state) => state.userId.permutationResult)
    const [rArrayD] = React.useState(NData)

    React.useEffect(()=>{
      dispatch(assignKchar(""))
      dispatch(resetrSet(""))
      dispatch(resetInsertedId(""))
      dispatch(assignActive(true))
      dispatch(assignIsClicked(false))
      rArrayD.length = 0
      RData.length = 0
    },[])

    const checkArray = () =>{
      if(CharData.includes(ch) === true || ch===''){

      }else{
        CharData.push(ch)
      }
    }

    const checkNData = () =>{
      if(NData.includes(rSet) === true || rSet === ''){

      }else{
        NData.push(rSet)
      }
    }

    const addRData = () =>{
      let str = ""
      if(rSet.length === 1){
        if(RData.includes(rSet) === true || rSet === ''){

        }else{
          RData.push(rSet)
        }
      }else{
        RData.length = 0
        for(let i = 1; i<=rSet.length; i++){
          if(i % arraylen !== 0){
            str = str + rSet.charAt(i-1) + ","
          }else{
            str = str + rSet.charAt(i-1)
            RData.push(str)
            str=""
          }
        }
      }
    }

    checkArray()
    checkNData()
    addRData()
  return (
    <div className='calculator'>
      <div className='permutations'>
        <p>Total amount in a set 'n' = <span>{n}</span></p>
        <p>Amount in each subset 'r' = <span>{r}</span></p>
        <p>Total number of permutations are = <span>{totalPermutation}</span></p>
      </div>
      <div className='header'>
        <p>Make selection of your choice</p>
      </div>
      <div className='boxes'>
        {
          keyboardChars.map((keyboardChar)=>{
            return <Box key={keyboardChar} 
                        keyboardChar={keyboardChar}/>
          })
        }
      </div>
      <div className='nSet'>
      <h3 className='hint'>Select {n} variables from the keyboard above</h3>
      <div className='setnBoxes'>
        {
          CharData.map(jk =>{
            return <SetnBox key={jk} kbChar={jk} />
          })
        }
      </div>
      </div>
      <div className='rSet'>
        {rArrayD.length !== 0 &&<h3 className='hint'>Select {r} variables from the keyboard above</h3>}
        <div className='savedB'>
          {
            SData.length !== 0 ? SData.map((sd) =>{
              return<div key={sd} className='savedDiv'><p>Step-{SData.indexOf(sd) + 1}</p><SavedBox key={sd} sData={sd}/></div>
            }):""
          }
        </div>
        <div className='setrBoxes'>
          {
            isClicked ? RData.length === 0 ? <div className='loadingSpinner'></div>: RData.map(stArray =>{
             return <SetrBox key={stArray} rData={stArray} />
            }): ""
          }
        </div>
        {rArrayD.length !==0 ? isClicked ? <p className='hint'>Click on the character to save it</p>
         :SData.length === Number(r) ? <div className='final'><p className=''>Final permutation</p><SavedBox sData={SData[r-1]}/></div> : <p className='hint2'>Now select any variable from above</p>:""}
      </div>
    </div>
  )
}

export default Calculator
