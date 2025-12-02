import { useRef, type Dispatch, type SetStateAction } from "react";
import styles from "../../Assets/Style/Home/Filter.module.css";
import { IconSearch } from "../../Assets/icons/IconSearch";
import { IconFilter } from "../../Assets/icons/IconFilter";

type Props = {
  setFilterOpen: Dispatch<SetStateAction<boolean>>;
  search: string;
  onSearchChange: (value: string) => void;
  activeGenres: string[];
  onToggleGenres: (genre: string) => void;
  activeFilters: number;
};

export const Filter = ({
  setFilterOpen,
  search,
  onSearchChange,
  activeGenres,
  onToggleGenres,
  activeFilters
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section className={styles.Filter}>
      <div onClick={handleFocusInput} className={styles.contentInputSearch}>
        <IconSearch color="#99A1AF" />
        <input
          ref={inputRef}
          className={styles.inputSearch}
          type="text"
          placeholder="Buscar anime, géneros, estudios..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className={styles.buttonsFilters}>
        <button
          onClick={() => setFilterOpen((prev) => !prev)}
          className={`${styles.buttonFilter}`}
        >
          <IconFilter size={20} />
          Filtros
          {activeFilters !== 0 && (
            <span className={styles.numberFilter}>{activeFilters}</span>
          )}
        </button>
        <button
          onClick={() => onToggleGenres("Acción")}
          value={"Acción"}
          className={`${styles.buttonFilter} ${
            activeGenres.includes("Acción") ? styles.active : ""
          }`}
        >
          Acción
        </button>
        <button
          onClick={() => onToggleGenres("Aventura")}
          value={"Aventura"}
          className={`${styles.buttonFilter} ${
            activeGenres.includes("Aventura") ? styles.active : ""
          }`}
        >
          Aventura
        </button>
        <button
          onClick={() => onToggleGenres("Romance")}
          value={"Romance"}
          className={`${styles.buttonFilter} ${
            activeGenres.includes("Romance") ? styles.active : ""
          }`}
        >
          Romance
        </button>
        <button
          onClick={() => onToggleGenres("Comedia")}
          value={"Comedia"}
          className={`${styles.buttonFilter} ${
            activeGenres.includes("Comedia") ? styles.active : ""
          }`}
        >
          Comedia
        </button>
        <button
          onClick={() => onToggleGenres("Doblaje Latino")}
          value={"Doblaje Latino"}
          className={`${styles.buttonFilter} ${
            activeGenres.includes("Doblaje Latino") ? styles.active : ""
          }`}
        >
          Doblaje Latino
        </button>
      </div>
    </section>
  );
};
