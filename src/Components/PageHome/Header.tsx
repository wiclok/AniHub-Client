import styles from '../../Assets/Style/Home/Header.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.divLogo}>
        <img src="AniHub-logo-trasparent-min.png" alt="Logo de AniHub" className={styles.logo} />
      </div>
      <div className={styles.divButtons}>
        <a href="/Login" className={styles.Login}>Iniciar Sesión</a>
        <a href="/Register" className={styles.Register}>Registrarse</a>
      </div>
    </header>
  )
}
