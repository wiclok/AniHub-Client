import styles from '../../Assets/Style/Home/Hero.module.css'
import { IconSparkles } from  '../../Assets/icons/IconSparkles'
import { IconBolt } from '../../Assets/icons/IconBolt'
import { IconHeart } from '../../Assets/icons/IconHeart'

export const Hero = () => {
  return (
    <section className={styles.Hero}>
      <h1 className={styles.heroTitle}>
        Tu plataforma <span className={styles.wordWithIcon}>de <IconSparkles /></span> <span className={styles.textGradient}>anime <br />favorita</span>
      </h1>
      <p className={styles.heroSubtitle}>Descubre, vota y conecta con la comunidad anime argentina. Sigue tus <br />series, comparte opiniones y encuentra tu próximo anime favorito.</p>
      <div className={styles.ctaContainer}>
        <a href="#get-started" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}> <IconBolt size={20} color='white' />Comenzar</a>
        <a href="#get-started" className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}> <IconHeart size={20} />Explorar Catálogo</a>
      </div>
    </section>
  )
}
