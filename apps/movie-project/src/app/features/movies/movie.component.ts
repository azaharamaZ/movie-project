import { Component, computed, HostListener, inject } from '@angular/core';
import { MovieService } from './movies.service';
import { RouterLink } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieRowComponent } from './movie-row/movie-row.component';

@Component({
  selector: 'app-movie',
  imports: [RouterLink, MovieCardComponent, MovieRowComponent],
  templateUrl: './movie.component.html',
})
export class MovieComponent {
  //Computed nos permite crear una signal a través de otra signal
  isLoading = computed(() => this._movieService.isLoading());
  hasMorePages = computed(() => this._movieService.hasMorePages());

  private readonly _movieService = inject(MovieService);

  readonly movies = this._movieService.movies;

  trendingMovies = computed(() => this._movieService.trendingMovies());

  //Controlar paginacion, escucha eventos del objeto windows -> scroll
  @HostListener('window:scroll')
  onScroll(): void {
    if (this.isLoading() || !this.hasMorePages()) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollThrehold = document.documentElement.scrollHeight;

    if (scrollPosition >= scrollThrehold) {
      this._movieService.getMovies();
    }
  }
}
