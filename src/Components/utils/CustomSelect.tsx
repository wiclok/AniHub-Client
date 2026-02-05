import { useEffect, useRef, useState } from "react";
import styles from "../../assets/Style/Home/customSelect.module.css";

type Option = {
  label: string;
  value: string;
};

type CustomSelectProps = {
  label: string;
  placeholder: string;
  value: string | null;
  options: Option[];
  onChange: (value: string | null) => void;
};

export const CustomSelect = ({
  label,
  placeholder,
  value,
  options,
  onChange,
}: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleSelect = (newValue: string) => {
    onChange(newValue);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  // Cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  return (
    <div className={styles.inputSelect} ref={wrapperRef}>
      <label className={styles.label}>{label}</label>

      <button
        type="button"
        className={`${styles.selectButton} ${open ? styles.open : ""}`}
        onClick={toggleOpen}
        aria-expanded={open}
      >
        <span className={styles.selectText}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <div className={styles.rightSide}>
          {selectedOption && (
            <span
              className={styles.clearBadge}
              onClick={handleClear}
              aria-label="Limpiar selección"
            >
              ✕
            </span>
          )}
          <span className={styles.chevron}>▾</span>
        </div>
      </button>

      {open && (
        <div className={styles.dropdown}>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`${styles.option} ${
                opt.value === value ? styles.optionActive : ""
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
