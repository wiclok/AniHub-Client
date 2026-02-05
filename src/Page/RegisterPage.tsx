import styles from "../assets/Style/Register/RegisterPage.module.css";
import { FormRegister } from "../Components/Register/FormRegister";

export const RegisterPage = () => {
  return (
    <div className={styles.RegisterPage}>
      <div className={styles.backgroundCircles}>
        <div className={`${styles.circle} ${styles.circleTopLeft}`} />
        <div className={`${styles.circle} ${styles.circleBottomRight}`} />
      </div>
      <div className={styles.content}>
        <h1>Únete a AniHub</h1>
        <p>Crea tu cuenta y forma parte de la comunidad anime argentina</p>
        <FormRegister />
      </div>
    </div>
  );
};
