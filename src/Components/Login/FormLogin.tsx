import React, { useState } from "react";
import { IconEyeClosed } from "../../Assets/icons/IconEyeClosed";
import { IconLock } from "../../Assets/icons/IconLock";
import { IconMail } from "../../Assets/icons/IconMail";
import styles from "../../Assets/Style/Login/FormLogin.module.css";
import { IconEye } from "../../Assets/icons/IconEye";
import { CustomFetch } from "../../api/customFetch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IconGoogle } from "../../Assets/icons/IconGoogle";

export const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "email":
        if (value.trim().length === 0) {
          error = "El email es requerido";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Email inválido";
        } else {
          error = "";
        }
        break;

      case "password":
        if (value.trim().length === 0) {
          error = "La contraseña es requerida";
        } else if (value.length < 8) {
          error = "Debe tener al menos 8 caracteres";
        } else {
          error = "";
        }
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    try {
      console.log(userData);
      const response = await CustomFetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        "POST",
        userData
      );
    await refreshUser();
    navigate("/home");

      console.log("✅ Login exitoso:", response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("An unexpected error occurred");
      }
      setShowModal(true);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputDiv}>
        <label htmlFor="email">Email</label>
        <div className={styles.input}>
          {errors.email ? <IconMail color="red" /> : <IconMail />}
          <input
            type="text"
            name="email"
            id="email"
            placeholder="tu@gmail.com"
            onChange={handleChange}
            onBlur={(e) => validateField(e.target.name, e.target.value)}
            value={userData.email}
          />
        </div>
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}
      </div>

      <div className={styles.inputDiv}>
        <label htmlFor="password">Contraseña</label>
        <div className={styles.inputPassword}>
          {errors.password ? <IconLock color="red" /> : <IconLock />}
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="********"
            onChange={handleChange}
            onBlur={(e) => validateField(e.target.name, e.target.value)}
            value={userData.password}
          />
          <div onClick={handleShowPassword}>
            {!showPassword ? <IconEyeClosed /> : <IconEye />}
          </div>
        </div>
        {errors.password && (
          <p className={styles.errorText}>{errors.password}</p>
        )}
      </div>

      <button type="submit">Iniciar Sesión</button>

      {/* 🔹 Login con Google */}
      <div className={styles.divider}>
        <span>o</span>
      </div>
      <a
        href={`${import.meta.env.VITE_API_URL}/auth/google`}
        className={styles.googleButton}
      >
        <IconGoogle size={24}/>
        Continuar con Google
      </a>
      <span>
        ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
      </span>
      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Error en el registro</h2>
            <ul className={styles.errorList}>
              {serverError?.split(",").map((msg, idx) => (
                <li key={idx}>{msg.trim()}</li>
              ))}
            </ul>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </form>
  );
};
