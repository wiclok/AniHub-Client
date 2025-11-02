import styles from '../Assets/Style/Login/LoginPage.module.css'
import { FormLogin } from '../Components/Login/FormLogin';

export const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.backgroundCircles}>
        <div className={`${styles.circle} ${styles.circleTopLeft}`} />
        <div className={`${styles.circle} ${styles.circleBottomRight}`} />
      </div>
      <div className={styles.content}>
        <h1>Bienvenido de vuelta</h1>
        <p>Ingresa a tu cuenta para continuar explorando</p>
        <FormLogin />
      </div>
    </div>
  );
};
