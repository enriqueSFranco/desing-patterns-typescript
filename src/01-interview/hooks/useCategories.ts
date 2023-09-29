import { getCategories } from "../services/migrado-libre-service"
import { useEffect, useState } from "react"

export function useCategories () {
  const [allCategories, setAllCategories] = useState(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, updateLoading] = useState(false)

  useEffect(() => {
    updateLoading(true)
    getCategories()
      .then(response => {
        console.log(response)
        setAllCategories(response)
      })
      .catch(error => {
        if (error instanceof Error) {
          setError(error.message)
        }
      })
      .finally(() => updateLoading(false))
  }, [])

  return { allCategories, error, loading }
}