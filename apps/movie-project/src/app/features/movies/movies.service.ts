import { inject, Injectable, signal } from '@angular/core';
import { Movie, MovieResponse } from './models/movie.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  movies = signal<Movie[]>([]);
  trendingMovies = signal<Movie[]>([]);
  selectedMovie = signal<Movie | null>(null);

  currentPage = signal<number>(1);
  hasMorePages = signal<boolean>(true);
  isLoading = signal<boolean>(false);

  private readonly _apiKey = '520ee56ecd9ceff87ba2cc17335afcfe';

  private readonly _apiUrl = 'https://api.themoviedb.org/3';
  //   private readonly _searchTerm = signal<string>('');

  private readonly _http = inject(HttpClient);

  constructor() {
    this.getMovies();
  }
  getMovieById(movieId: string): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(
      `${this._apiUrl}/movie/${movieId}?api_key=${this._apiKey}`
    );
  }

  getMovies(): void {
    this._http
      .get<MovieResponse>(
        `${this._apiUrl}/movie/popular?api_key=${this._apiKey}`
      )
      .pipe(
        tap((response) => {
          const currentMovies = this.movies();
          this.movies.set([...currentMovies, ...response.results]);
          this.hasMorePages.set(response.page < response.total_pages);
          this.currentPage.update((currentPage) => currentPage + 1);
          this.isLoading.set(false);
        })
      )
      .subscribe(); //en la signal de movie seteamos el result, recuperamos las movies
  }
}
