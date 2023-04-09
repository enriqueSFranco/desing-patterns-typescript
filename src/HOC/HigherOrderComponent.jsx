import ContactFormWithValidation from './FormHOC'

// creamos el HOC
function withUser (Component) {
  return function ({ name = 'Kike', lastName = 'sfranco', age = 27 }) {
    const data = {
      name,
      lastName,
      age
    }
    return <Component value={data} />
  }
}

// componente que usara el HOC

function User ({ name, lastName, age }) {
  return (
    <div>
      <h2>User information</h2>
      <p>{name}</p>
      <p>{lastName}</p>
      <p>{age}</p>
    </div>
  )
}

// Envolver el componente en el HOC
const MyComponentWithUser = withUser(User)

function HigherOrderComponent () {
  return (
    <section>
      <h2>HOC (Higher Order Component)</h2>
      <MyComponentWithUser />
      <hr />
      <ContactFormWithValidation />
    </section>
  )
}

export default HigherOrderComponent
