import React, { useEffect, useRef, useState } from "react";
import { IconEyeClosed } from "../../assets/icons/IconEyeClosed";
import { IconLock } from "../../assets/icons/IconLock";
import { IconMail } from "../../assets/icons/IconMail";
import styles from "../../assets/Style/Login/FormLogin.module.css";
import { IconEye } from "../../assets/icons/IconEye";
import { CustomFetch } from "../../api/customFetch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IconGoogle } from "../../assets/icons/IconGoogle";

export const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const popupRef = useRef<Window | null>(null);

  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleShowPassword = () => {
    setShowPassword((p) => !p);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((p) => ({ ...p, [name]: value }));
  };

  // LOGIN NORMAL
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    try {
      await CustomFetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        "POST",
        userData
      );

      await refreshUser();
      navigate("/home");
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : "Error inesperado"
      );
      setShowModal(true);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = () => {
    if (googleLoading) return;
    setGoogleLoading(true);

    popupRef.current = window.open(
      `${import.meta.env.VITE_API_URL}/auth/google`,
      "Google Login",
      "width=500,height=600"
    );

    if (!popupRef.current) {
      setGoogleLoading(false);
      setServerError("No se pudo abrir el popup");
      setShowModal(true);
    }
  };

  // LISTENER ÚNICO Y CORRECTO
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

    return () => {
      window.removeEventListener("message", listener);
    };
  }, [navigate, refreshUser]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputDiv}>
        <label>Email</label>
        <div className={styles.input}>
          <IconMail />
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.inputDiv}>
        <label>Contraseña</label>
        <div className={styles.inputPassword}>
          <IconLock />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <div onClick={handleShowPassword}>
            {showPassword ? <IconEye /> : <IconEyeClosed />}
          </div>
        </div>
      </div>

      <button type="submit">Iniciar Sesión</button>

      <div className={styles.divider}>
        <span>o</span>
      </div>

      <button
        type="button"
        className={styles.googleButton}
        onClick={handleGoogleLogin}
        disabled={googleLoading}
      >
        <IconGoogle size={24} />
        {googleLoading ? "Cargando..." : "Continuar con Google"}
      </button>

      {/* enlace a login */}
      <p className={styles.registerLink}>
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>

      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Error</h2>
            <p>{serverError}</p>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </form>
  );
};
