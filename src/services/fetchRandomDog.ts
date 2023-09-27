import { ResponseStatus } from "../shared/types.d"
import { ResponseStatusText } from "../shared/enums.d"

type Suspender<T> = {
  read (): T | null
}

export function getSuspender<T> (promise: Promise<T>): Suspender<T> {
  let status: ResponseStatus = ResponseStatusText.PENDING
  let response: T | null = null

  const suspender = promise.then(
    (res) => {
      status = ResponseStatusText.SUCCESS
      response = res
    },
    (err) => {
      status = ResponseStatusText.ERROR
      response = err
    }
  )

  const read = () => {
    if (status === ResponseStatusText.PENDING) {
      throw suspender
    } else if (status === ResponseStatusText.ERROR) {
      throw response
    } else {
      return response
    }
  }
  return { read }
}

export function fetchData<T> (endpoint: URL): Suspender<T> {
  const url = new URL(endpoint)

  const promise = fetch(`${url.href}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json()
    })
    .catch(error => {
      throw error
    })

  return getSuspender(promise)
}
