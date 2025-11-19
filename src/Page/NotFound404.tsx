import { IconGhost3 } from '../Assets/icons/IconGhost3'
import { IconHome } from '../Assets/icons/IconHome'
import styles from '../Assets/Style/NotFound404/NotFound404.module.css'

export const NotFound404 = () => {
  return (
    <div className={styles.NotFound}>
      <div className={styles.backgroundCircles}>
        <div className={`${styles.circle} ${styles.circleTopLeft}`} />
        <div className={`${styles.circle} ${styles.circleBottomRight}`} />
      </div>

      <div className={styles.divContent}>
        <div className={styles.icon404}>
          <h1>404</h1>
          <IconGhost3 className={styles.iconGhost3}/>
        </div>
        <div className={styles.textDiv}>
          <h2>¡Uy! Esta página se perdió en el vacío</h2>
          <p>Parece que esta página decidió hacer un viaje interdimensional sin avisar. No te preocupes, te ayudamos a volver al mundo del anime.</p>
        </div>
        <a href='/' className={styles.buttonToHome}><IconHome size={24} color='#fff'/>Volver al inicio</a>
      </div>

    </div>
  )
}
