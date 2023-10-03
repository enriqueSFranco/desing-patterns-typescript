import { Link } from 'react-router-dom'
import { useProducts, useCategories } from '../hooks'
import { Debuger } from '../components/debuger'
import { Product } from '../components/product'
import styles from './home.module.css'


export const Home = () => {
  const { products, error, loading } = useProducts()
  const { allCategories, error: errorCategories, loading: loadingCategories } = useCategories()

  return (
    <>
      {/* <Debuger state={allCategories} /> */}
      <header>
        <h2>migrado libre</h2>
      </header>
      <main className={styles.container}>
        <aside className={styles.container_menu}>
          <h2>menu</h2>
          <ul>
            {/* categories */}
            {loadingCategories && <h3>cargando categorias...</h3>}
            {errorCategories && <span>{errorCategories}</span>}
            {/* TODO: ARREGLAR */}
            {allCategories && allCategories.pathFromRoot.map((category) => (
              <li key={`category-id-${category.name}`}><Link to={''}>{category.name}</Link></li>
            ))}
          </ul>
        </aside>
        <section className={styles.container_products}>
          {/* listado de productos */}
          <h2>productos</h2>
          {loading && <h3>cargando productos...</h3>}
          {error && <span>{error}</span>}
          <ul className={styles.product_list}>
            {products && products.map(item => (
              <li key={item.id}>
                <Product product={item} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
