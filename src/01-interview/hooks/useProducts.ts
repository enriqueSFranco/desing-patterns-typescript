import { useEffect, useState } from "react"
import { getProducts } from "../services/migrado-libre-service"

export function useProducts () {
  const [products, setProducts] = useState(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, updateLoading] = useState(false)

  useEffect(() => {
    updateLoading(true)
    getProducts()
      .then(response => {
        setProducts(response)
      })
      .catch(error => {
        if (error instanceof Error) {
          setError(error.message)
        }
      })
      .finally(() => updateLoading(false))
  }, [])

  return { products, error, loading }
}