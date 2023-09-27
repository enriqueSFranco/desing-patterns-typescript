import styles from './index.module.css'

type DogImageProps = {
  img: URL
  status: string
}
// MARK: COMPONENTE DUMB <- SE CENTRA EN COMO SE VE Y EN LA ESTRUCTURA
export const DogImage = ({ img, status }: DogImageProps) => {
  const uri = new URL(img).href
  const classNameStatus = status === 'succes' ? styles.success : styles.error

  return (
    <figure>
      <img src={uri} alt="dog" />
      <figcaption>
        <span className={classNameStatus}>Status: {status}</span>
      </figcaption>
    </figure >
  )
}
