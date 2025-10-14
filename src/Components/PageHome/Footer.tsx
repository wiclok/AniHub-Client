import styles from '../../Assets/Style/Home/Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        &copy; {new Date().getFullYear()} AniHub. Hecho con ❤️ para la comunidad anime argentina.
      </div>
    </footer>
  )
}
