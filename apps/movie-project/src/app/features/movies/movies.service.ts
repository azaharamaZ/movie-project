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
    this.getTrending();
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
        tap((movies: MovieResponse) => {
          const currentMovies = this.movies();
          this.movies.set([...currentMovies, ...movies.results]);
          this.hasMorePages.set(movies.page < movies.total_pages);
          this.currentPage.update((currentPage) => currentPage + 1);
          this.isLoading.set(false);
        })
      )
      .subscribe(); //en la signal de movie seteamos el result, recuperamos las movies
  }

  getTrending(): void {
    this._http
      .get<MovieResponse>(
        `${this._apiUrl}/trending/movie/day?api_key=${this._apiKey}` //docu API
      )
      .pipe(
        tap((movies: MovieResponse) => this.trendingMovies.set(movies.results)),
        tap(() => this.setRandomMovie())
      )
      .subscribe();
  }

  setRandomMovie() {
    const trendingLenght = this.trendingMovies().length;
    const randomIndex = this._getRandomInt(0, trendingLenght);
    const randomMovie = this.trendingMovies()[randomIndex];
    this.selectedMovie.set(randomMovie);
  }

  searchMovie(query: string): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(
      `${this._apiUrl}/search/movie?api_key=${this._apiKey}&query=${query}`
    );
  }
  // esto deberia ir en otro servicio
  private _getRandomInt(min = 0, max = 50) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
