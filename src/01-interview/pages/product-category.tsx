import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCategories } from '../services/migrado-libre-service'


export const ProductCategory = () => {
  const { category_id } = useParams()

  useEffect(() => {
    getCategories()
      .then(response => console.log(response))
  }, [category_id])

  return (
    <div>
      <h2>categorias</h2>
    </div>
  )
}
