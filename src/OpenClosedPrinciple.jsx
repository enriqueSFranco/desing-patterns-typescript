import { useState } from 'react'
import Home from './views/Home'
import Dashboard from './views/Dashboard'

/**
 * Hay que tener cuidado cuando usamos Open closed principle porque al
 * usar la prop children es verdad que el componente esta abierto a
 * extensión, pero igual no se puede controlar que es lo que debe admitir
 * el component padre para redenderizar, es decir, en el componente
 * Header se quieren renderizar un menu dependiendo la url en la que
 * se encuentre el usuario, pero no se tiene control sobre lo que se
 * va a renderizar en el componente Header, una solucion que podemos
 * implementar es hacer uso del patron render props
 **/
function OpenClosedPrinciple () {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  return (
    <main style={{ outline: '2px solid #09f' }}>
      <h2>Open Closed Principle</h2>
      {currentPath === '/' && <Home />}
      {currentPath === '/dashboard' && <Dashboard />}
    </main>
  )
}

export default OpenClosedPrinciple
