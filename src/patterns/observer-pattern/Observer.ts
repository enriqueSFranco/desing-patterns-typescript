interface Observer {
  update (data: string): void
}

interface Subject {
  subscribe (observer: Observer): void
  unsubscribe (observer: Observer): void
  notify (data: string): void
}

export class ConcreteSubject implements Subject {

  private observers: Observer[]

  constructor() {
    this.observers = []
  }

  subscribe (observer: Observer): void {
    // Verificar si el observador ya esta agregado
    const isExist = this.observers.includes(observer)

    if (isExist) {
      // ya exisste el observer
      console.log('Subject: Observer has been attached already.')
      return
    }

    // agregamos el observer
    console.log('Subject: Attached an observer.')
    this.observers.push(observer)
  }

  unsubscribe (observer: Observer): void {
    // Buscar si el observer existe
    const observerIdx = this.observers.indexOf(observer)
    const notFoundObserver = -1

    if (observerIdx === notFoundObserver) {
      console.log('Subject: Nonexistent observer.')
    }

    this.observers.filter(it => it !== observer)
  }

  notify (data: string): void {
    for (const observer of this.observers) {
      observer.update(data)
    }
  }
}

export default new ConcreteSubject()