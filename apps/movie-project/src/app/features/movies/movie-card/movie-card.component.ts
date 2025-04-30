import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Movie } from '../models/movie.interface';

@Component({
  selector: 'app-movie-card',
  template: ` <div class="cursor-pointer" role="button">
    <img
      [src]="getImageUrl()"
      (error)="setImageError(true)"
      [alt]="movie().title"
      class="aspect-[2/3]"
    />
    <div class="movie-card-overlay">
      <div class="movie-card-content">
        <h3 class="mb-2 text-lg font-bold">
          {{ movie().title }}
        </h3>
        <p class="text-sm text-gray-300 line-clamp-2">
          {{ movie().overview }}
        </p>
      </div>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  movie = input.required<Movie>();
  imageError = false;

  getImageUrl(): string {
    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    return this.imageError
      ? '/placeholder.svg'
      : `${baseUrl}/${this.movie().poster_path}`;
  }

  // Si hay algun error en la img hay un evento q es el error q pasara a ser true
  setImageError(value: boolean): void {
    this.imageError = value;
  }
}
