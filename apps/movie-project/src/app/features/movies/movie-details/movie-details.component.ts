import { Component, inject, input } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService } from '../movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ImageService } from '../../../shared/image.service';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, DatePipe, DecimalPipe],
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent {
  // movieId = this.route.snapshot.params.['movieId']
  //nuevo input signal, podremos recuperar el id
  movieId = input.required<string>();

  private readonly _router = inject(Router);
  private readonly _movieService = inject(MovieService);
  private readonly _imageService = inject(ImageService);

  movie = rxResource({
    request: this.movieId,
    loader: () => this._movieService.getMovieById(this.movieId()),
  });

  getImageUrl(posterPath: string | null): string {
    return this._imageService.getImageUrl(posterPath);
  }

  goBack(): void {
    this._router.navigate(['..']);
  }
}
