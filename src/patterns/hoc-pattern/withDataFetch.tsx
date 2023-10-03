import { useEffect, useState } from "react"
import api from './RequestManager'
import { type Pokemon } from "./models.d"

export const withDataFetch = ({ Component }: { Component: React.Component<any> }) => {
  return (props) => {
    const [data, setData] = useState<Pokemon | null>(null)
    const [error, setError] = useState(null)
    const [loading, updateLoading] = useState(false)

    const fetchData = async ({ endpoint }: { endpoint: string }): Promise<Pokemon | null> => {
      try {
        const url = new URL(endpoint)
        const response = await api.startRequest<Pokemon>(url)
        return response
      } catch (error) {
        throw (`Error: ${error}`)
      }
    }

    useEffect(() => {
      // TODO: SERVICE
      fetchData({ endpoint: 'https://pokeapi.co/api/v2/pokemon/ditto' })
        .then(response => {
          updateLoading(true)
          setData(response)
          setError(null)
        })
        .catch(error => setError(error))
        .finally(() => updateLoading(false))

      return () => api.cancelRequest()
    }, [])

    return <Component {...props} data={data} error={error} loading={loading} />
  }
}