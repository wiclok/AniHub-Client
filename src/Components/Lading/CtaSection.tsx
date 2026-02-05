import { IconArrowRight } from '../../assets/icons/IconArrowRight'
import { IconSparkles } from '../../assets/icons/IconSparkles'
import styles from '../../assets/Style/Landing/CtaSection.module.css'

export const CtaSection = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.line}></div>
      <h1 className={styles.title}>Únete a la comunidad anime argentina</h1>
      <p className={styles.description}>
        Miles de fans ya están usando AniHub para descubrir, votar y discutir sobre anime. ¡No te quedes afuera!
      </p>
      <span className={styles.users}>
        <div className={styles.circle}></div> +127 usuarios se unieron esta semana
      </span>
      
      {/* MOVIDO AQUÍ */}
      <a href="#">
        <IconSparkles /> Crear Cuenta Gratis <IconArrowRight />
      </a>
    </section>
  )
}
