import { IconSparkles } from '../../Assets/icons/IconSparkles'
import styles from '../../Assets/Style/Home/Hero.module.css'
import { useAuth } from '../../context/AuthContext'

export const Hero = () => {

  const { user } = useAuth()

  const userName = user?.name?.split(' ')
  const firstNamePart = userName?.[0] || 'Usuario'

  return (
    <section className={styles.Hero}>
      <div className={styles.welcomeMessage}><IconSparkles className={styles.IconSparkles}/>Hola, {firstNamePart}</div>
      <h1>Descubrí tu próximo <span>anime favorito</span></h1>
      <p>Miles de títulos esperando por vos. Explorá, votá y unite a la comunidad más grande de Argentina.</p>
    </section>
  )
}
