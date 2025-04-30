import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService } from '../../../features/movies/movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Movie } from '../../../features/movies/models/movie.interface';

@Component({
  selector: 'app-search',
  imports: [CommonModule, DatePipe],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchQuery = signal<string>('');

  private readonly _router = inject(Router);
  private readonly _movieService = inject(MovieService);

  filteredMovies = rxResource({
    request: () => this.searchQuery, // esta forma es mas limpia
    // request: this.searchQuery()
    loader: () => this._movieService.searchMovie(this.searchQuery()),
    // must. cada vez q request cambia el loader se activa, y en este caso ataca a searchMove, y lo q devuelva se almacena en filtered movie
  });

  movies = linkedSignal(
    () => this.filteredMovies.value()?.results ?? ([] as Movie[])
  );

  // movies = computed(
  //   () => this.filteredMovies.value()?.results ?? ([] as Movie[])
  // );

  // Esto se puede mejorar usando el models
  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  goToDetails(movieId: string): void {
    this._router.navigate(['/movies', movieId]);
    this._clearQuery();
  }

  private _clearQuery(): void {
    this.searchQuery.set('');
  }
}
