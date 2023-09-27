const person = {
  name: 'kike',
  age: 27,
  nationality: 'CDMX'
}

const personProxy = new Proxy(person, {
  get (target, prop) {
    if (!target[prop]) {
      console.log('Hmm.. this property doesn\'t seem to exist on the target object')
    } else console.log(`The value of ${prop} is ${Reflect.get(target, prop)}`)
  },
  set (target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      console.log('Sorry, you can only pass numeric values for age.')
    } else if ((prop === 'name') && (value.length < 2)) {
      console.log('You need to provide a valid value.')
    } else {
      console.log(`Changed ${prop} from ${Reflect.get(target, prop)} to ${value}`)
      // console.log(`Changed ${prop} from ${target[prop]} to ${value}`)
      return Reflect.set(target, prop, value)
    }
  }
})

/* personProxy.nonExistentProperty
personProxy.name = '' */

console.log(personProxy.name)
personProxy.age = 43
personProxy.name = 'Jane Doe'

console.log(personProxy)

/* console.log(personProxy.name)
personProxy.age = 22

console.log(personProxy) */
