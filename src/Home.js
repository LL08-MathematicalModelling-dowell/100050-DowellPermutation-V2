import React from 'react'
import PermutationInputs from './PermutationInputs/PermutationInputs'
import Calculator from './PermutationInputs/Calculator'
import {HashRouter, Routes, Route} from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className='home'>
      <HashRouter>
        <Routes>
        <Route path="/" element={<PermutationInputs />}/>
        <Route path='/calculator' element={<Calculator />} />
        </Routes>
        </HashRouter>
    </div>
  )
}

export default Home
