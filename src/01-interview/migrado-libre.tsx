import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/home'
import { ProductCategory } from './pages/product-category'


const router = createHashRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: ':category_id',
    element: <ProductCategory />
  }
])

export const MigradoLibreApp = () => {


  return (
    <RouterProvider router={router} />
  )
}
