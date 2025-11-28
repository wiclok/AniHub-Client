import { Header } from "../Components/Lading/Header"
import styles from '../Assets/Style/Landing/Landing.module.css'
import { Hero } from "../Components/Lading/Hero"
import { Stats } from "../Components/Lading/Stats/Stats"
import { Features } from "../Components/Lading/Features/Features"
import { CtaSection } from "../Components/Lading/CtaSection"
import { Footer } from "../Components/Lading/Footer"

export const Index = () => {
  return (

    <>
      <div className={styles.Home}>
        <div className={styles.backgroundCircles}>
          <div className={`${styles.circle} ${styles.circleTopLeft}`} />
          <div className={`${styles.circle} ${styles.circleBottomRight}`} />
        </div>
        
        <Header />
        <main className={styles.mainContent}>
          <Hero />
          <Stats />
          <Features />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
