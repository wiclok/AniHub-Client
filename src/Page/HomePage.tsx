import styles from '../Assets/Style/Home/home.module.css'
import { Header } from '../Components/Lading/Header'

export const HomePage = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.backgroundCircles}>
        <div className={`${styles.circle} ${styles.circleTopLeft}`} />
        <div className={`${styles.circle} ${styles.circleBottomRight}`} />
      </div>

      <Header />
    </div>
  )
}
