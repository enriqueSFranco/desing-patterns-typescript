import { toast } from 'sonner'
import observable from './Observer'

function handleToast () {
  observable.notify('User clicked button!')
}

function toastify (data: string) {
  toast(data, { position: 'bottom-right' })
}

observable.subscribe({ update: toastify })

export const ObserverPattern = () => {

  return (
    <main>
      <header>
        <h3>Observer Pattern</h3>
        <h3>Use observables para notificar a los suscriptores cuando ocurra un evento</h3>
      </header>
      <button onClick={handleToast}>show alert</button>
    </main>
  )
}

/**
 * Relación de uno a muchos entre objetos
 * ¡Cada vez que ocurre un evento, el observable notifica a todos sus observadores!
 * 
 * Un objeto observable generalmente contiene 3 partes importantes:
 * [observers]: una serie de observadores que serán notificados cada vez que ocurra un evento específico
 * [subscribe()]: un método para agregar observadores a la lista de observadores
 * [unsubscribe()]: un método para eliminar observadores de la lista de observadores
 * [notify()]: un método para notificar a todos los observadores cada vez que ocurra un evento específico
 **/
