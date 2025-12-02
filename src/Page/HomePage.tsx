import { useState } from "react";
import styles from "../Assets/Style/Home/home.module.css";
import { Filter } from "../Components/Home/Filter";
import { Hero } from "../Components/Home/Hero";
import { Header } from "../Components/Lading/Header";
import { SectionFilter } from "../Components/Home/SectionFilter";
import type { AnimeFilters } from "../types/anime";

const initialFilters: AnimeFilters = {
  search: "",
  genres: [],
  year: null,
  status: null,
  orderBy: "popular",
};

export const HomePage = () => {

  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<AnimeFilters>(initialFilters);

  const handleSearch = (value: string) => {
  setFilters(prev => ({ ...prev, search: value }));
};

const handleToggleGenres = (genre: string) => {
  setFilters(prev => ({
    ...prev,
    genres: prev.genres.includes(genre)
      ? prev.genres.filter(g => g !== genre)
      : [...prev.genres, genre],
  }));
};

const handleChangeYear = (year: string | null) => {
  setFilters(prev => ({ ...prev, year }));
};

const handleChangeStatus = (status: AnimeFilters["status"]) => {
  setFilters(prev => ({ ...prev, status }));
};

const handleChangeOrderBy = (orderBy: AnimeFilters["orderBy"]) => {
  setFilters(prev => ({ ...prev, orderBy }));
};

const handleClearFilters = () => {
  setFilters(initialFilters)
}

const activeFiltersCount =
  filters.genres.length +
  (filters.year ? 1 : 0) +
  (filters.status ? 1 : 0);



  return (
    <div className={styles.Home}>
      <div className={styles.backgroundCircles}>
        <div className={`${styles.circle} ${styles.circleTopLeft}`} />
        <div className={`${styles.circle} ${styles.circleBottomRight}`} />
      </div>

      <Header />

      <div className={styles.mainContent}>
        <Hero />
        <Filter
          setFilterOpen={setFilterOpen}
          search={filters.search}
          onSearchChange={handleSearch}
          activeGenres={filters.genres}
          onToggleGenres={handleToggleGenres}
          activeFilters={activeFiltersCount}
        />
        {filterOpen && (
          <SectionFilter 
            year={filters.year}
            status={filters.status}
            orderBy={filters.orderBy}
            onChangeYear={handleChangeYear}
            onChangeStatus={handleChangeStatus}
            onChangeOrderBy={handleChangeOrderBy}
            activeGenres={filters.genres}
            onToggleGenres={handleToggleGenres}
            activeFilters={activeFiltersCount}
            handleClearFilters={handleClearFilters}
          />
        )}
      </div>
    </div>
  );
};
