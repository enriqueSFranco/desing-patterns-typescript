import { useEffect, useState } from 'react'

/**
 * helper para establecer el contrato de la api https://jsonplaceholder.typicode.com/users
 * @param {Array} data
 * @returns {Object}
 * */
function mappedResponse (data) {
  return data.map(item => ({
    userId: item.id,
    username: item.username,
    email: item.email,
    phone: item.phone,
    website: item.website,
    address: item.address,
    company: item.company
  }))
}

async function serviceGetUsers () {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')

    if (!response.ok) {
      const error = {
        err: new Error('Oppps, ha ocurrido un error durante la peticion'),
        status: response.status || '00',
        statusText: response.statusText || 'Opps, ha ocurrido un error'
      }
      throw error
    }
    const json = await response.json()
    return mappedResponse(json)
  } catch (error) {
    return error
  }
}

/**
 * Separamos el useEffect del componente para crear el custom hook
*/
function useUsers () { // ESTO NO SERIA SINGLE RESPONSIBILITY PRINCPLE
  const [users, setUsers] = useState([])
  /*
    El custom hook sigue haciendo varias cosas
    1.- Maneja el estado
    2.- Hace el fetching de datos

    Algunas mejoras que podemos hacer:
    separar en un archivo el custom hook (hooks/useUser.jsx)
    separar en un archivo la funcion getUsers (services/getUsers.js)
  */

  useEffect(() => {
    /* const getUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (!response.ok) {
          const error = {
            err: new Error('Oppps, ha ocurrido un error durante la peticion'),
            status: response.status || '00',
            statusText: response.statusText || 'Opps, ha ocurrido un error'
          }
          throw error
        }
        const json = await response.json()
        setUsers(mappedResponse(json))
      } catch (error) {
        return error
      }
    } */
    serviceGetUsers()
      .then(response => setUsers(response))
      .catch(console.error)
  }, [])
  return users
}

/*
  Este componente tiene varias responsabilidades
  1.- Gestiona el estado
  2.- Hace el fetching de datos
  3.- Renderizado del componente

  Al separar el useEffect en un custom hook nuestro componente solo
  se dedica al renderizado del componente
*/
function SingleResposibilityPrinciple () {
  /* const [users, setUsers] = useState(null) */
  const users = useUsers()

  /*
    Normalmente cuando se tiene un useEffect significa que se puede
    crear un custom hook
  */
  /*
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        if (!response.ok) {
          const error = {
            err: new Error('Oppps, ha ocurrido un error durante la peticion'),
            status: response.status || '00',
            statusText: response.statusText || 'Opps, ha ocurrido un error'
          }
          throw error
        }
        const json = await response.json()
        setUsers(mappedResponse(json))
      } catch (error) {
        return error
      }
    }
    getUsers()
  }, [])
} */
  return (
    <section>
      <h2>Single Responsibility Principle</h2>
      <ul>
        {users.map(user => (
          <li key={`user-id-${user.username}`}><span>{user.username}</span></li>
        ))}
      </ul>
    </section>
  )
}

export default SingleResposibilityPrinciple
