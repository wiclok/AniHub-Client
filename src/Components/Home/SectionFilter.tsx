import { IconX } from "../../Assets/icons/IconX";
import styles from "../../Assets/Style/Home/SectionFilter.module.css";
import type { AnimeFilters } from "../../types/anime";
import { CustomSelect } from "../utils/CustomSelect";

type Props = {
  year: string | null;
  status: string | null;
  orderBy: string;
  onChangeYear: (year: string | null) => void;
  onChangeStatus: (status: AnimeFilters["status"]) => void;
  onChangeOrderBy: (orderBy: AnimeFilters["orderBy"]) => void;
  activeGenres: string[];
  onToggleGenres: (genre: string) => void;
  activeFilters: number;
  handleClearFilters: () => void
};

export const SectionFilter = ({
  year,
  status,
  orderBy,
  onChangeYear,
  onChangeStatus,
  onChangeOrderBy,
  activeGenres,
  onToggleGenres,
  activeFilters,
  handleClearFilters
}: Props) => {
  const years = [
    { label: "Año 2025", value: "2025" },
    { label: "Año 2024", value: "2024" },
    { label: "Año 2023", value: "2023" },
    { label: "Año 2022", value: "2022" },
    { label: "Año 2021", value: "2021" },
    { label: "Año 2020", value: "2020" },
    { label: "Año 2019", value: "2019" },
    { label: "Año 2018", value: "2018" },
    { label: "Año 2017", value: "2017" },
    { label: "Año 2016", value: "2016" },
    { label: "Año 2015", value: "2015" },
    { label: "Año 2014", value: "2014" },
    { label: "Año 2013", value: "2013" },
    { label: "Año 2012", value: "2012" },
    { label: "Año 2011", value: "2011" },
    { label: "Año 2010", value: "2010" },
    { label: "Año 2009", value: "2009" },
    { label: "Año 2008", value: "2008" },
  ];

  const statuses = [
    { label: "En emisión", value: "ongoing" },
    { label: "Finalizado", value: "finished" },
    { label: "Próximamente", value: "upcoming" },
  ];

  const orderOptions = [
    { label: "Popularidad", value: "popular" },
    { label: "Lo más gustado", value: "score" },
    { label: "Lo más visto", value: "views" },
  ];

  const genres = [
    "Acción",
    "Aventura",
    "Comedia",
    "Drama",
    "Fantasía",
    "Horror",
    "Romance",
    "Escolar",
    "Sobrenatural",
    "Miltar",
    "Histórico",
    "Superhéroes",
  ];

  return (
    <section className={styles.sectionFilter}>
      <div className={styles.sectionInputsSelect}>
        <CustomSelect
          label="Año"
          placeholder="Cualquier año"
          value={year}
          options={years}
          onChange={onChangeYear}
        />

        <CustomSelect
          label="Estado"
          placeholder="Cualquier estado"
          value={status ?? ""}
          options={statuses}
          onChange={(val) => onChangeStatus(val as AnimeFilters["status"])}
        />

        <CustomSelect
          label="Ordenar por"
          placeholder="Popularidad"
          value={orderBy}
          options={orderOptions}
          onChange={(val) => onChangeOrderBy(val as AnimeFilters["orderBy"])}
        />
      </div>

      <div className={styles.containerButtonsGeneros}>
        {genres.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => onToggleGenres(g)}
            className={`${styles.btnGenero} ${
              activeGenres.includes(g) ? styles.btnGeneroActive : ""
            }`}
          >
            {g}
          </button>
        ))}
      </div>
      {activeFilters !== 0 && (
        <>
          <div className={styles.divider}></div>
          <div className={styles.divButtonClearFilters}>
            <button
              onClick={handleClearFilters}
            >
              <IconX size={20} color="#FFA2A2" />
              Limpiar Filtros
            </button>
          </div>
        </>
      )}
    </section>
  );
};
