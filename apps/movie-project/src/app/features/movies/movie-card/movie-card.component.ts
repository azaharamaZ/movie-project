import { Component, input } from '@angular/core';
import { Movie } from '../models/movie.interface';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  imports: [JsonPipe],
  template: `<p>{{ movie() | json }}</p>`,
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  movie = input.required<Movie>();
}
