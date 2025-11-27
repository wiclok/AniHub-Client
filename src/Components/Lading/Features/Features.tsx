import styles from '../../../Assets/Style/Home/Features/Features.module.css'
import { FeaturesCard } from './FeaturesCard'
import { IconCalendarWeek } from '../../../Assets/icons/IconCalendarWeek'
import { IconPlayerPlay } from '../../../Assets/icons/IconPlayerPlay'
import { IconMapPin } from '../../../Assets/icons/IconMapPin'
import { IconTrendingUp } from '../../../Assets/icons/IconTrendingUp'
import { IconUsers } from '../../../Assets/icons/IconUsers'
import { IconStar } from '../../../Assets/icons/IconStar'

export const Features = () => {
  return (
    <section className={styles.FeaturesSection}>
      <div className={styles.FeaturesHeader}>
        <h2>¿Por qué elegir AniHub?</h2>
        <p>Descubre todas las características que hacen de AniHub la mejor plataforma para los fans del anime en Argentina</p>
      </div>
      <div className={styles.FeaturesGrid}>
        <FeaturesCard icon={<IconStar size={30} color='#fff'/>} title="Vota por Episodios" description="Califica cada episodio y descubre qué piensa la comunidad argentina sobre tus series favoritas." background='linear-gradient(135deg, #2A80FF, #00B8DB)'/>
        <FeaturesCard icon={<IconTrendingUp size={30} color='#fff'/>} title="Rankings Argentinos"  description="Ve qué anime está trending en Argentina y descubre las tendencias por provincia." background='linear-gradient(135deg, #00C951, #00BC7C)'/>
        <FeaturesCard icon={<IconUsers size={30} color='#fff'/>} title="Comunidad Activa" description="Conecta con otros fans, participa en discusiones y comparte tus opiniones sobre anime." background='linear-gradient(135deg, #AD46FF, #E13196)'/>
        <FeaturesCard icon={<IconCalendarWeek size={30} color='#fff'/>} title="Calendario de Estrenos" description="Mantente al día con los estrenos ajustados al horario argentino y nunca te pierdas un episodio." background='linear-gradient(135deg, #FF6700, #FC3532)'/>
        <FeaturesCard icon={<IconMapPin size={30} color='#fff'/>} title="Enfoque Regional" description="Filtros especiales para doblaje latino, tendencias locales y contenido relevante para Argentina." background='linear-gradient(135deg, #EEAD02, #FF6B00)'/>
        <FeaturesCard icon={<IconPlayerPlay size={30} color='#fff'/>} title="Seguimiento Personal" description="Lleva un registro de lo que viste, planeas ver y tus estadísticas personales de anime." background='linear-gradient(135deg, #625EFE, #A946FA'/>
      </div>
    </section>
  )
}