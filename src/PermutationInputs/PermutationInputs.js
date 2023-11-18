import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { assignSetN, assignSetR, assignPermutationResult, resetN, resetR, resetPermutationResult } from '../app/features/counter/CounterSlice'
import './PermutationInputs.css'

function PermutationInputs() {

  const [n, setN]=React.useState('')
  const [r, setR]=React.useState('')
  const [nerror, setNError]=React.useState(false)
  const [rerror, setRError]=React.useState(false)
  const [showButtons, setShowButtons] = React.useState(false)
  const [permutationResult, setPermutationResult] = React.useState(0)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const calculatePermutation = (e) =>{
    e.preventDefault()
    if(n > 50 || n === ''){
      setNError(!nerror)
    }else if(r > 50 || r === ''){
      setRError(!rerror)
    }else{
      //Calculate permutation
      setShowButtons(!showButtons)
      let numerator = 1
      let denominator = 1
      for(let i=n; i>=1;i--){
        numerator = numerator * i
      }

      for(let i=n-r; i>=1;i--){
        denominator = denominator * i
      }
      setPermutationResult(numerator/denominator)
    }
  }

  const handleShowPermutation = (e) =>{
    e.preventDefault()
    dispatch(assignSetN(n))
    dispatch(assignSetR(r))
    dispatch(assignPermutationResult(permutationResult))
    navigate('/calculator')
  }

  const resetAll = () =>{
    dispatch(resetN(''));
    dispatch(resetR(''))
    dispatch(resetPermutationResult(''))
  }

  const handleReset = () =>{
    setN(0)
    setR(0)
    resetAll()
  }

  return (
    <div className='permutationInputs'>
      <h1>Calculate Combinations and Permutations</h1>
      <form>
        <label>Total amount in a set(n)</label>
        <input type='number' id={nerror ? 'nInput':''} value={n} onChange={(e)=>setN(e.target.value)} max="50"/>
        <span>Hint: Max limit is 50</span>
        <label>Total amount in each subset(r)</label>
        <input type='number' id={rerror ? 'rInput':''} value={r} onChange={(e)=>setR(e.target.value)}max="50"/>
        <div className='permutationButtons' id={showButtons ? 'formButtons':''}>
          <button className='resetButton' onClick={handleReset}>Reset</button>
          <button className='calculateButton' onClick={calculatePermutation}>Calculate</button>
        </div>
        <div className='permutationResults' id={showButtons ? 'formResults':''}>
          <p>Number of Permutations = <span className='amount'>{permutationResult}</span></p>
          <button onClick={handleShowPermutation}>Show Permutations</button>
        </div>
      </form>
    </div>
  )
}

export default PermutationInputs
