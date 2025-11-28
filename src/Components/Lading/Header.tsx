import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "../../Assets/Style/Landing/Header.module.css";

export const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);


  const avatarSrc = user?.avatar
    ? user.avatar
    : "/default-avatar-profile-icon-social-600nw-1906669723.webp";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout && logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.divLogo}>
        <img
          src="AniHub-logo-trasparent-min.png"
          alt="Logo de AniHub"
          className={styles.logo}
          onClick={()=> {
            window.location.href = '/'
          }}
        />
      </div>

      <div className={styles.divButtons}>
        {!user ? (
          <>
            <a href="/Login" className={styles.Login}>
              Iniciar Sesión
            </a>
            <a href="/Register" className={styles.Register}>
              Registrarse
            </a>
          </>
        ) : (
          <>
            <a className={styles.anchor} href="#">Catálogo</a>
            <a className={styles.anchor} href="#">Rankings</a>
            <div className={styles.profileWrapper} ref={menuRef}>
              <button
                type="button"
                className={styles.profileButton}
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <img
                  src={avatarSrc}
                  alt="imagen del perfil"
                  className={styles.imageProfile}
                />
              </button>

              {isMenuOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownItem} onClick={handleLogout}>
                    Cerrar sesión
                  </div>

                  <div
                    className={styles.dropdownItem}
                    onClick={() => console.log("Otra opción")}
                  >
                    Otra opción
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};
