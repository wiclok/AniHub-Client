import styles from "../../Assets/Style/Register/FormRegister.module.css";
import { IconUser } from "../../Assets/icons/IconUser";
import { IconMail } from "../../Assets/icons/IconMail";
import { IconLock } from "../../Assets/icons/IconLock";
import { IconEye } from "../../Assets/icons/IconEye";
import { useState } from "react";
import { IconEyeClosed } from "../../Assets/icons/IconEyeClosed";
import { IconExclamationCircle } from "../../Assets/icons/IconExclamationCircle";
import { CustomFetch } from "../../api/customFetch";
import { IconGoogle } from "../../Assets/icons/IconGoogle";

export const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<
    "veryWeak" | "weak" | "medium" | "strong" | ""
  >("");
  const [passwordScore, setPasswordScore] = useState<number>(0);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, userData[name as keyof typeof userData] as string);
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
    if (score <= 1) return "#ff1a1a";
    if (score === 2) return "#ff4d4f";
    if (score === 3 || score === 4) return "#ffa940";
    if (score === 5) return "#52c41a";
    return "rgba(255,255,255,0.2)";
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    try {
      const response = await CustomFetch(
        "http://localhost:3000/auth/register",
        "POST",
        userData
      );

      console.log("✅ Usuario registrado:", response);
      setShowModal(true);
    } catch (error: any) {
      setServerError(error.message);
      setShowModal(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Nombre de usuario */}
      <div className={styles.inputDiv}>
        <label htmlFor="name">Nombre de usuario</label>
        <div
          className={`${styles.input} ${
            touched.name && errors.name ? styles.inputError : ""
          }`}
        >
          {touched.name && errors.name ? (
            <IconUser color="red" className={styles.icon} />
          ) : (
            <IconUser className={styles.icon} />
          )}
          <input
            type="text"
            placeholder="otaku_arg"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name && (
            <IconExclamationCircle color="red" className={styles.iconError} />
          )}
        </div>
        {touched.name && errors.name && (
          <p className={styles.errorText}>{errors.name}</p>
        )}
      </div>
      {/* Email */}
      <div className={styles.inputDiv}>
        <label htmlFor="email">Email</label>
        <div
          className={`${styles.input} ${
            touched.email && errors.email ? styles.inputError : ""
          }`}
        >
          {touched.email && errors.email ? (
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
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <IconExclamationCircle color="red" className={styles.iconError} />
          )}
        </div>
        {touched.email && errors.email && (
          <p className={styles.errorText}>{errors.email}</p>
        )}
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
            onBlur={handleBlur}
          />
          <div onClick={handlePasswordVisibility}>
            {showPassword ? <IconEye /> : <IconEyeClosed />}
          </div>
        </div>

        {/* Texto y barra de fortaleza */}
        {userData.password.length > 0 && (
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

        {touched.password && errors.password && (
          <p className={styles.errorText}>{errors.password}</p>
        )}
      </div>
      {/* Confirmar contraseña */}
      <div className={styles.inputDiv}>
        <label htmlFor="passwordConfirm">Confirmar Contraseña</label>
        <div
          className={`${styles.input} ${
            touched.confirmPassword && errors.confirmPassword
              ? styles.inputError
              : ""
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
            onBlur={handleBlur}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <IconExclamationCircle color="red" className={styles.iconError} />
          )}
        </div>
        {touched.confirmPassword && errors.confirmPassword && (
          <p className={styles.errorText}>{errors.confirmPassword}</p>
        )}
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
      {/* 🔹 Login con Google */}
      <div className={styles.divider}>
        <span>o</span>
      </div>
      <a
        href="http://localhost:3000/auth/google"
        className={styles.googleButton}
      >
        <IconGoogle size={24}/>
        Continuar con Google
      </a>
      <span>
        ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
      </span>
      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {serverError ? (
              <>
                <h2>Error en el registro</h2>
                <ul className={styles.errorList}>
                  {serverError?.split(",").map((msg, idx) => (
                    <li key={idx}>{msg.trim()}</li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h2>¡Registro exitoso! 🎉</h2>
                <p>
                  Te enviamos un correo de verificación. <br />
                  Revisá tu bandeja de entrada y hacé clic en el botón
                  <strong> “Verificar mi correo”</strong> para activar tu
                  cuenta.
                </p>
              </>
            )}
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </form>
  );
};
