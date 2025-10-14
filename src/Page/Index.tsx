import { Header } from "../Components/PageHome/Header"
import styles from '../Assets/Style/Home/Home.module.css'
import { Hero } from "../Components/PageHome/Hero"
import { Stats } from "../Components/PageHome/Stats/Stats"
import { Features } from "../Components/PageHome/Features/Features"
import { CtaSection } from "../Components/PageHome/CtaSection"
import { Footer } from "../Components/PageHome/Footer"

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
