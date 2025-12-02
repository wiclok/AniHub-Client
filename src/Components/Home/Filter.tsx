import { useRef, useState } from "react";
import styles from "../../Assets/Style/Home/Filter.module.css";
import { IconSearch } from "../../Assets/icons/IconSearch";
import { IconFilter } from "../../Assets/icons/IconFilter";

export const Filter = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  const [filters, setFilters] = useState<string[]>([]);
  const selectFilter = (e: any) => {
    const value = e.target.value;

    setFilters((prev) => {
      return prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
    });

    console.log("Seleccionaste:", value);
  };

  console.log("Filtros actuales:", filters);
  return (
    <section className={styles.Filter}>
      <div onClick={handleFocusInput} className={styles.contentInputSearch}>
        <IconSearch color="#99A1AF" />
        <input
          ref={inputRef}
          className={styles.inputSearch}
          type="text"
          placeholder="Buscar anime, géneros, estudios..."
        />
      </div>
      <div className={styles.buttonsFilters}>
        <button className={`${styles.buttonFilter}`}>
          <IconFilter size={20} />
          Filtros
        {
          filters.length !== 0 && <span className={styles.numberFilter}>{filters.length}</span>
        }
        </button>
        <button
          onClick={selectFilter}
          value={"Acción"}
          className={`${styles.buttonFilter} ${filters.includes("Acción") ? styles.active : ""}`}
        >
          Acción
        </button>
        <button
          onClick={selectFilter}
          value={"Aventura"}
          className={`${styles.buttonFilter} ${filters.includes("Aventura") ? styles.active : ""}`}
        >
          Aventura
        </button>
        <button
          onClick={selectFilter}
          value={"Romance"}
          className={`${styles.buttonFilter} ${filters.includes("Romance") ? styles.active : ""}`}
        >
          Romance
        </button>
        <button
          onClick={selectFilter}
          value={"Comedia"}
          className={`${styles.buttonFilter} ${filters.includes("Comedia") ? styles.active : ""}`}
        >
          Comedia
        </button>
        <button
          onClick={selectFilter}
          value={"Doblaje Latino"}
          className={`${styles.buttonFilter} ${filters.includes("Doblaje Latino") ? styles.active : ""}`}
        >
          Doblaje Latino
        </button>
      </div>
    </section>
  );
};
