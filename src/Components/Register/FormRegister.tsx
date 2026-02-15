// ===============================
// IMPORTS
// ===============================
import styles from "../../assets/Style/Register/FormRegister.module.css";
import { IconUser } from "../../assets/icons/IconUser";
import { IconMail } from "../../assets/icons/IconMail";
import { IconLock } from "../../assets/icons/IconLock";
import { IconEye } from "../../assets/icons/IconEye";
import { IconEyeClosed } from "../../assets/icons/IconEyeClosed";
import { IconExclamationCircle } from "../../assets/icons/IconExclamationCircle";
import { IconGoogle } from "../../assets/icons/IconGoogle";

import { useEffect, useRef, useState } from "react";
import { CustomFetch } from "../../api/customFetch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ===============================
// COMPONENT
// ===============================
export const FormRegister = () => {

  // ===============================
  // UI STATES
  // ===============================
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<
    "veryWeak" | "weak" | "medium" | "strong" | ""
  >("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // ===============================
  // FORM STATE
  // ===============================
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  // ===============================
  // VALIDATION STATE
  // ===============================
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

  // ===============================
  // SERVER STATE
  // ===============================
  const [serverError, setServerError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ===============================
  // CONTEXT & NAVIGATION
  // ===============================
  const popupRef = useRef<Window | null>(null);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  // ===============================
  // PASSWORD VISIBILITY
  // ===============================
  const handlePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // ===============================
  // INPUT CHANGE
  // ===============================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setUserData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (type !== "checkbox") {
      validateField(name, value);
    }
  };

  // ===============================
  // BLUR
  // ===============================
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, userData[name as keyof typeof userData] as string);
  };

  // ===============================
  // PASSWORD STRENGTH
  // ===============================
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
    else if (strength <= 4) setPasswordStrength("medium");
    else if (strength === 5) setPasswordStrength("strong");
    else setPasswordStrength("");
  };

  const getStrengthColor = (score: number) => {
    if (score <= 1) return "#ff1a1a";
    if (score === 2) return "#ff4d4f";
    if (score <= 4) return "#ffa940";
    if (score === 5) return "#52c41a";
    return "rgba(255,255,255,0.2)";
  };

  // ===============================
  // FIELD VALIDATION
  // ===============================
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) error = "El nombre es requerido";
        else if (value.length < 3) error = "Debe tener al menos 3 caracteres";
        else if (value.length > 20)
          error = "No puede tener más de 20 caracteres";
        break;

      case "email":
        if (!value) error = "El email es requerido";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Email inválido";
        break;

      case "password":
        if (!value) error = "La contraseña es requerida";
        else if (value.length < 8)
          error = "Debe tener al menos 8 caracteres";
        evaluatePasswordStrength(value);
        break;

      case "confirmPassword":
        if (!value)
          error = "La confirmación de contraseña es requerida";
        else if (value !== userData.password)
          error = "Las contraseñas no coinciden";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ===============================
  // REGISTER NORMAL
  // ===============================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    setLoading(true);

    try {
      await CustomFetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        "POST",
        userData
      );

      setShowSuccessModal(true);

    } catch (error: unknown) {
      setServerError(
        error instanceof Error ? error.message : "Error inesperado"
      );
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // GOOGLE REGISTER
  // ===============================
  const handleGoogleRegister = () => {
    if (googleLoading) return;

    setGoogleLoading(true);

    popupRef.current = window.open(
      `${import.meta.env.VITE_API_URL}/auth/google`,
      "Google Register",
      "width=500,height=600"
    );

    if (!popupRef.current) {
      setGoogleLoading(false);
      setServerError("No se pudo abrir el popup");
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    const listener = async (event: MessageEvent) => {
      if (event.origin !== import.meta.env.VITE_API_URL) return;
      if (event.data !== "auth-success") return;

      popupRef.current?.close();
      popupRef.current = null;

      setGoogleLoading(false);
      await refreshUser();
      navigate("/home");
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [navigate, refreshUser]);

  // ===============================
  // RENDER
  // ===============================
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      
      {/* USERNAME */}
      <div className={styles.inputDiv}>
        <label>Nombre de usuario</label>
        <div className={`${styles.input} ${touched.name && errors.name ? styles.inputError : ""}`}>
          <IconUser className={styles.icon} />
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name && (
            <IconExclamationCircle color="red" className={styles.iconError}/>
          )}
        </div>
        {touched.name && errors.name && (
          <p className={styles.errorText}>{errors.name}</p>
        )}
      </div>

      {/* EMAIL */}
      <div className={styles.inputDiv}>
        <label>Email</label>
        <div className={`${styles.input} ${touched.email && errors.email ? styles.inputError : ""}`}>
          <IconMail className={styles.icon}/>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <IconExclamationCircle color="red" className={styles.iconError}/>
          )}
        </div>
        {touched.email && errors.email && (
          <p className={styles.errorText}>{errors.email}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div className={styles.inputDiv}>
        <label>Contraseña</label>
        <div className={styles.inputPassword}>
          <IconLock className={styles.icon}/>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={userData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div onClick={handlePasswordVisibility}>
            {showPassword ? <IconEye /> : <IconEyeClosed />}
          </div>
        </div>

        {userData.password.length > 0 && (
          <>
            {passwordStrength && (
              <p>
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
              {[0,1,2,3,4].map((idx) => {
                const active = idx < passwordScore;
                return (
                  <span
                    key={idx}
                    className={styles.barSegment}
                    style={{
                      backgroundColor: active
                        ? getStrengthColor(passwordScore)
                        : "rgba(255,255,255,0.18)",
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

      {/* CONFIRM PASSWORD */}
      <div className={styles.inputDiv}>
        <label>Confirmar contraseña</label>
        <div className={`${styles.input} ${touched.confirmPassword && errors.confirmPassword ? styles.inputError : ""}`}>
          <IconLock className={styles.icon}/>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <IconExclamationCircle color="red" className={styles.iconError}/>
          )}
        </div>
        {touched.confirmPassword && errors.confirmPassword && (
          <p className={styles.errorText}>{errors.confirmPassword}</p>
        )}
      </div>

      {/* TERMS */}
      <div className={styles.terms}>
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={userData.terms}
            onChange={handleChange}
          />
          Acepto los términos y condiciones
        </label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </button>

      <div className={styles.divider}><span>o</span></div>

      {/* GOOGLE */}
      <button
        type="button"
        className={styles.googleButton}
        onClick={handleGoogleRegister}
        disabled={googleLoading}
      >
        <IconGoogle size={24}/>
        {googleLoading ? "Cargando..." : "Continuar con Google"}
      </button>

      <p className={styles.loginLink}>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>

      {/* ERROR MODAL */}
      {showErrorModal && (
        <div className={styles.modalOverlay} onClick={() => setShowErrorModal(false)}>
          <div className={styles.modal} onClick={(e)=>e.stopPropagation()}>
            <h2>Error</h2>
            <p>{serverError}</p>
            <button onClick={()=>setShowErrorModal(false)}>Cerrar</button>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className={styles.modalOverlay} onClick={() => setShowSuccessModal(false)}>
          <div className={styles.modal} onClick={(e)=>e.stopPropagation()}>
            <h2>Registro exitoso</h2>
            <p>
              Tu cuenta fue creada correctamente.
              Revisa tu correo electrónico para verificar tu cuenta antes de iniciar sesión.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/login");
              }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}

    </form>
  );
};
