import { Component, inject } from '@angular/core';
import { MovieService } from './movies.service';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.component.html',
})
export class MovieComponent {
  private readonly _movieService = inject(MovieService);

  private readonly movies = this._movieService.movies;

  constructor() {
    console.log(this.movies());
  }
}
