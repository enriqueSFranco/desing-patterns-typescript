class RequestManager {
  private controller: AbortController | null = null

  constructor() {
    this.controller = new AbortController()
  }

  async startRequest<T> (endpoint: URL): Promise<T | null> {
    if (this.controller) {
      // Si ya hay una solicitud en curso, la cancela antes de comenzar una nueva
      this.controller.abort()
    }

    try {
      const url = new URL(endpoint)
      this.controller = new AbortController()
      const response = await fetch(url.href, { signal: this.controller.signal })

      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa')
      }

      const decoder: T = await response.json()

      return decoder
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          // La solicitud fue cancelada, puedes manejarla de acuerdo a tus necesidades
          throw (`La solicitud fue cancelada: ${error.message}`)
        } else {
          // Manejar otros errores
          throw (`Ocurrió un error en la solicitud: ${error}`)
        }
      }
      return null
    } finally {
      // Limpia la instancia de AbortController
      this.controller = null
    }
  }

  cancelRequest () {
    if (this.controller) {
      this.controller.abort()
      this.controller = null
    }
  }
}

const requestManager = new RequestManager()

export default requestManager