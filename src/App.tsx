import React from 'react'
// import SingleResposibilityPrinciple from './solid/single-responsibility-principle/SingleResponsibilityPrinciple'
// import OpenClosedPrinciple from './solid/open-closed-principle/OpenClosedPrinciple'
import './App.css'
import { DogImageContainer } from '@/patterns/presentational-container'

function App () {
  return (
    <React.Fragment>
      {/* <SingleResposibilityPrinciple /> */}
      {/* <OpenClosedPrinciple /> */}
      <DogImageContainer />
    </React.Fragment>
  )
}

export default App
