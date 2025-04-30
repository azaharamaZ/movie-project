import { Component, inject, input } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MovieService } from '../movies.service';
import { rxResource } from '@angular/core/rxjs-interop';

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

  movie = rxResource({
    request: this.movieId,
    loader: () => this._movieService.getMovieById(this.movieId()),
  });

  goBack(): void {
    this._router.navigate(['..']);
  }
}
