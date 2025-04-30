import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
  model,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService } from '../../../features/movies/movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Movie } from '../../../features/movies/models/movie.interface';
import { ImageService } from '../../../shared/image.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchQuery = model<string>('');

  private readonly _router = inject(Router);
  private readonly _movieService = inject(MovieService);
  private readonly _imageService = inject(ImageService);

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

  getImageUrl(posterPath: string): string {
    return this._imageService.getImageUrl(posterPath);
  }

  // onSearchInput(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   this.searchQuery.set(input.value);
  // }

  goToDetails(movieId: string): void {
    this._router.navigate(['/movies', movieId]);
    this._clearQuery();
  }

  private _clearQuery(): void {
    this.searchQuery.set('');
  }
}
