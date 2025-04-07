let instance

class Counter {
  constructor() {
    this.counter = 0

    if (instance) {
      throw new Error('You can only create one instance!')
    }
    instance = this
  }

  getInstance () {
    return this
  }

  getCounter () {
    return this.counter
  }

  increment () {
    return this.counter++
  }

  decrement () {
    return this.counter--
  }
}

const sigletonCounter = Object.freeze(new Counter())

export default sigletonCounter
