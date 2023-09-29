import styles from './debuger.module.css'

export const Debuger = ({ state }) => {
  return (
    <div className={styles.container_debuger}>
      <p>
        {JSON.stringify(state, null, ' ')}
      </p>
    </div>
  )
}
