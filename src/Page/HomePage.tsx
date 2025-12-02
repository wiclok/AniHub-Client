import { useState } from 'react'
import styles from '../Assets/Style/Home/home.module.css'
import { Filter } from '../Components/Home/Filter'
import { Hero } from '../Components/Home/Hero'
import { Header } from '../Components/Lading/Header'
import { SectionFilter } from '../Components/Home/SectionFilter'

export const HomePage = () => {

  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <div className={styles.Home}>
      <div className={styles.backgroundCircles}>
        <div className={`${styles.circle} ${styles.circleTopLeft}`} />
        <div className={`${styles.circle} ${styles.circleBottomRight}`} />
      </div>

      <Header />

      <div className={styles.mainContent}>
        <Hero />
        <Filter setFilterOpen={setFilterOpen}/>
        {
          filterOpen && <SectionFilter />
        }
      </div>
    </div>
  )
}
