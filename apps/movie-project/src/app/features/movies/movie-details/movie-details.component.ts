import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent {
  // movieId = this.route.snapshot.params.['movieId']
  //nuevo input signal, podremos recuperar el id
  movieId = input.required<string>();
}
