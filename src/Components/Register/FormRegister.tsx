import styles from "../../Assets/Style/Register/FormRegister.module.css";
import { IconUser } from "../../Assets/icons/IconUser";
import { IconMail } from "../../Assets/icons/IconMail";
import { IconLock } from "../../Assets/icons/IconLock";
import { IconEye } from "../../Assets/icons/IconEye";
import { useState } from "react";
import { IconEyeClosed } from "../../Assets/icons/IconEyeClosed";
import { IconExclamationCircle } from "../../Assets/icons/IconExclamationCircle";

export const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<
    "veryWeak" | "weak" | "medium" | "strong" | ""
  >("");
  const [passwordScore, setPasswordScore] = useState<number>(0);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setUserData({
      ...userData,
      [name]: newValue,
    });

    if (type !== "checkbox") {
      validateField(name, value);
    }
  };

  const evaluatePasswordStrength = (password: string) => {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    setPasswordScore(strength);

    if (strength <= 1) setPasswordStrength("veryWeak");
    else if (strength === 2) setPasswordStrength("weak");
    else if (strength === 3 || strength === 4) setPasswordStrength("medium");
    else if (strength === 5) setPasswordStrength("strong");
    else setPasswordStrength("");
  };

  const getStrengthColor = (score: number) => {
    if (score <= 1) return "#ff1a1a"; // rojo fuerte
    if (score === 2) return "#ff4d4f"; // rojo medio
    if (score === 3 || score === 4) return "#ffa940"; // naranja
    if (score === 5) return "#52c41a"; // verde
    return "rgba(255,255,255,0.2)";
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "username":
        if (value.length <= 0) {
          error = "El nombre de usuario es requerido";
        } else if (value.length < 3) {
          error = "Debe tener al menos 3 caracteres";
        } else if (value.length > 20) {
          error = "No puede tener más de 20 caracteres";
        }
        break;
      case "email":
        if (value.length <= 0) {
          error = "El email es requerido";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Email inválido";
        }
        break;
      case "password":
        if (value.length <= 0) {
          error = "La contraseña es requerida";
        } else if (value.length < 8) {
          error = "Debe tener al menos 8 caracteres";
        }
        evaluatePasswordStrength(value);
        break;
      case "confirmPassword":
        if (value.length <= 0) {
          error = "La confirmación de contraseña es requerida";
        } else if (value !== userData.password) {
          error = "Las contraseñas no coinciden";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Nombre de usuario */}
      <div className={styles.inputDiv}>
        <label htmlFor="username">Nombre de usuario</label>
        <div
          className={`${styles.input} ${
            errors.username ? styles.inputError : ""
          }`}
        >
          {errors.username ? (
            <IconUser color="red" className={styles.icon} />
          ) : (
            <IconUser className={styles.icon} />
          )}
          <input
            type="text"
            placeholder="otaku_arg"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <IconExclamationCircle color="red" className={styles.iconError} />
          )}
        </div>
        {errors.username && (
          <p className={styles.errorText}>{errors.username}</p>
        )}
      </div>

      {/* Email */}
      <div className={styles.inputDiv}>
        <label htmlFor="email">Email</label>
        <div className={styles.input}>
          {errors.email ? (
            <IconMail color="red" className={styles.icon} />
          ) : (
            <IconMail className={styles.icon} />
          )}
          <input
            type="text"
            placeholder="tu@gmail.com"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <IconExclamationCircle color="red" className={styles.iconError} />
          )}
        </div>
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}
      </div>

      {/* Contraseña */}
      <div className={styles.inputDiv}>
        <label htmlFor="password">Contraseña</label>
        <div className={styles.inputPassword}>
          <IconLock className={styles.icon} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="*********"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <div onClick={handlePasswordVisibility}>
            {showPassword ? <IconEye /> : <IconEyeClosed />}
          </div>
        </div>

        {/* Texto y barra de fortaleza */}
        {userData.password.length === 0 ? (
          <p className={styles.errorText}>La contraseña es requerida</p>
        ) : (
          <>
            {passwordStrength && (
              <p
                className={
                  passwordStrength === "veryWeak"
                    ? styles.veryWeak
                    : passwordStrength === "weak"
                    ? styles.weak
                    : passwordStrength === "medium"
                    ? styles.medium
                    : styles.strong
                }
              >
                Fortaleza:{" "}
                {passwordStrength === "veryWeak"
                  ? "Muy débil"
                  : passwordStrength === "weak"
                  ? "Débil"
                  : passwordStrength === "medium"
                  ? "Media"
                  : "Fuerte"}
              </p>
            )}

            <div className={styles.strengthBar}>
              {[0, 1, 2, 3, 4].map((idx) => {
                const active = idx < passwordScore;
                const color = active
                  ? getStrengthColor(passwordScore)
                  : "rgba(255,255,255,0.18)";
                return (
                  <span
                    key={idx}
                    className={styles.barSegment}
                    style={{
                      backgroundColor: color,
                      transform: active ? "scaleY(1)" : "scaleY(0.9)",
                      transition:
                        "background-color 250ms ease, transform 200ms ease",
                    }}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Confirmar contraseña */}
      <div className={styles.inputDiv}>
        <label htmlFor="passwordConfirm">Confirmar Contraseña</label>
        <div
          className={`${styles.input} ${
            errors.confirmPassword ? styles.inputError : ""
          }`}
        >
          <IconLock className={styles.icon} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="*********"
            id="passwordConfirm"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <IconExclamationCircle color="red" className={styles.iconError} />
          )}
        </div>

        {userData.confirmPassword.length === 0 ? (
          <p className={styles.errorText}>
            La confirmación de contraseña es requerida
          </p>
        ) : errors.confirmPassword ? (
          <p className={styles.errorText}>{errors.confirmPassword}</p>
        ) : null}
      </div>

      {/* Términos */}
      <div className={styles.terms}>
        <label htmlFor="terms">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={userData.terms}
            onChange={handleChange}
          />
          Acepto los <a href="#">términos y condiciones</a> y las{" "}
          <a href="#">políticas de privacidad</a>
        </label>
      </div>

      <button type="submit">Registrarse</button>
      <span>
        ¿Ya tienes una cuenta? <a href="#">Inicia sesión</a>
      </span>
    </form>
  );
};
