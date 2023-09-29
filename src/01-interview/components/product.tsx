import styles from './product.module.css'

export const Product = ({ product }) => {
  const { title, thumbnail, price } = product
  return (
    <figure className={styles.card}>
      <img src={thumbnail} alt="" className={styles.thumbnail} />

      <figcaption className={styles.product_detail}>
        <h2 className={styles.product_title}>{title}</h2>
        <h3 className={styles.product_price}>{price}</h3>
      </figcaption>
    </figure>
  )
}
