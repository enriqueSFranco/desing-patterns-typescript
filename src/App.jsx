import React from 'react'
import SingleResposibilityPrinciple from './SingleResponsibilityPrinciple'
import OpenClosedPrinciple from './OpenClosedPrinciple'
import CounterSingleton from './components/CounterSingleton'
import './App.css'

function App () {
  return (
    <div className='App'>
      <SingleResposibilityPrinciple />
      <OpenClosedPrinciple />
      <CounterSingleton />
    </div>
  )
}

export default App
