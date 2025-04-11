export interface Movie {
  id: string;
  title: string;
  poster: string;
  backdrop: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  release_date: string;
  vote_average: string;
  vote_count: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
