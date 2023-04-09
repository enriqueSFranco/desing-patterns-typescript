import { useState } from 'react'

// Definimos un HOC para validar los campos del formulario
function withFormValidation (WrapperComponent) {
  return function FormValidation (props) {
    const [formErrors, setFormErrors] = useState({})
    // funcion para validar los campos del formulario
    function validateFields (fields) {
      const errors = {}
      if (!fields.username) { errors.username = 'El username es requerido' }
      if (!fields.email) {
        errors.email = 'El email es requerido'
      } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
        errors.email = 'El email no es valido'
      }
      return errors
    }
    // funcion que se ejecuta al enviar el formulario
    function handleSubmit (e) {
      e.preventDefault()
      console.log('enviando formulario')
      const $form = e.target
      const formData = new FormData($form)
      const fields = {
        username: formData.get('username'),
        email: formData.get('email'),
        message: formData.get('message')
      }
      const errors = validateFields(fields)
      setFormErrors(errors)
      if (Object.keys(errors).length === 0) {
        props.onSubmit(fields)
        $form.reset()
      }
    }
    return <WrapperComponent {...props} onSubmit={handleSubmit} formErrors={formErrors} />
  }
}

function ContactForm (props) {
  const { formErrors, handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type='text' id='username' name='username' />
        {formErrors.username && <span>{formErrors.username}</span>}
      </div>
      <div>
        <input type='text' id='email' name='email' />
        {formErrors.email && <span>{formErrors.email}</span>}
      </div>
      <div>
        <textarea name='message' id='message' cols='30' rows='10' />
      </div>
      <button type='submit'>Enviar</button>
    </form>
  )
}

// envolcer el componente contact form con el HOC
const ContactFormWithValidation = withFormValidation(ContactForm)

export default ContactFormWithValidation
