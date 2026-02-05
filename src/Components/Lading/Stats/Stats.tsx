import styles from '../../../assets/Style/Landing/stats/Stats.module.css'
import { CardStats } from './CardStats'
import { IconTrendingUp } from '../../../assets/icons/IconTrendingUp'
import { IconUsers } from '../../../assets/icons/IconUsers'
import { IconHeart } from '../../../assets/icons/IconHeart'

export const Stats = () => {
  return (
    <section className={styles.StatsSection}>
      <CardStats icon={<IconUsers size={35} color='#C27AFF'/>} title="200+" description="Usuarios Activos" />
      <CardStats icon={<IconTrendingUp size={35} color='#C27AFF'/>} title="500+" description="Anime Catalogados" />
      <CardStats icon={<IconHeart size={35} color='#C27AFF'/>} title="1000+" description="Episodios Votados" />
    </section>
  )
}
