import { useState } from "react";
import styles from "../../Assets/Style/Home/SectionFilter.module.css";
import { CustomSelect } from "../utils/CustomSelect";

export const SectionFilter = () => {
  const [year, setYear] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<string | null>("popular");

  const years = [
    { label: "Cualquier año", value: "" },
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
    { label: "Cualquier estado", value: "" },
    { label: "En emisión", value: "ongoing" },
    { label: "Finalizado", value: "finished" },
    { label: "Próximamente", value: "upcoming" },
  ];

  const orderOptions = [
    { label: "Popularidad", value: "popular" },
    { label: "Lo más gustado", value: "score" },
    { label: "Lo más visto", value: "views" },
  ];

  return (
    <section className={styles.sectionFilter}>
      <div className={styles.sectionInputsSelect}>
        <CustomSelect
          label="Año"
          placeholder="Cualquier año"
          value={year}
          options={years}
          onChange={setYear}
        />

        <CustomSelect
          label="Estado"
          placeholder="Cualquier estado"
          value={status}
          options={statuses}
          onChange={setStatus}
        />

        <CustomSelect
          label="Ordenar por"
          placeholder="Popularidad"
          value={orderBy}
          options={orderOptions}
          onChange={setOrderBy}
        />
      </div>
      
    </section>
  );
};
