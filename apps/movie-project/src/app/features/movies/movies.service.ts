import { inject, Injectable, signal } from '@angular/core';
import { Movie, MovieResponse } from './models/movie.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  movies = signal<Movie[]>([]);
  trendingMovies = signal<Movie[]>([]);
  selectedMovie = signal<Movie | null>(null);

  private readonly _apiKey =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjBlZTU2ZWNkOWNlZmY4N2JhMmNjMTczMzVhZmNmZSIsIm5iZiI6MTc0MTMzNjAwNy44OTIsInN1YiI6IjY3Y2FhZGM3ZGNjOWMwM2ZmMGNiNWM2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xUbhtdKVPuNy1i6nHZIFjqGYsV0PevdzgrMUWLSCog4';

  private readonly _apiUrl = 'https://api.themoviedb.org/3';
  //   private readonly _searchTerm = signal<string>('');

  private readonly _http = inject(HttpClient);

  constructor() {
    this._getMovies();
  }
  getMovieById(movieId: string): Observable<MovieResponse> {
    return this._http.get<MovieResponse>(
      `${this._apiUrl}/movie/${movieId}?api_key=${this._apiKey}`
    );
  }

  private _getMovies(): void {
    this._http
      .get<MovieResponse>(
        `${this._apiUrl}/movie/popular?api_key=${this._apiKey}`
      )
      .pipe(tap((response) => this.movies.set(response.results)))
      .subscribe(); //en la signal de movie seteamos el result, recuperamos las movies
  }
}
