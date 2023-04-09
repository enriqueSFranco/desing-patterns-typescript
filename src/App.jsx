import SingleResposibilityPrinciple from './SingleResponsibilityPrinciple'
import './App.css'
import OpenClosedPrinciple from './OpenClosedPrinciple'
import HigherOrderComponent from './HOC/HigherOrderComponent'

function App () {
  return (
    <div className='App'>
      <SingleResposibilityPrinciple />
      <OpenClosedPrinciple />
      <HigherOrderComponent />
    </div>
  )
}

export default App
