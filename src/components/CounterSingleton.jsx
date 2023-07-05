import React from 'react'
import counter from '../patterns/singleton'

const CounterSingleton = () => {
  return (
    <div>
      <button onClick={counter.increment()}>click</button>
      <span>{counter.getCounter()}</span>
    </div>
  )
}

export default CounterSingleton
