import type { JSX } from 'react';
import styles from '../../../Assets/Style/Landing/stats/cardStats.module.css'

type CardStatsProps = {
  icon: JSX.Element;
  title: string;
  description: string;
}

export const CardStats = ({ icon, title, description }: CardStatsProps) => {
  return (
    <div className={styles.cardStats}>
      <div className={styles.cardIcon}>
        {icon}
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  )
}
