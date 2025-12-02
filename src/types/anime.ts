export type Anime = {
  id: number;
  title: string;
  genres: string[];
  year?: number;
  status?: "ongoing" | "finished" | "upcoming";
  popularity?: number;
  score?: number;
  views?: number;
  audioLanguages: string[];
};

export type AnimeFilters = {
  search: string;
  genres: string[];
  year: string | null;
  status: "ongoing" | "finished" | "upcoming" | "" | null;
  orderBy: "popular" | "score" | "views";
};
