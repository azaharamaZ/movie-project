import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './layouts/hero/hero.component';
import { MovieService } from './features/movies/movies.service';
import { NavbarComponent } from './layouts/navbar/navbar.component';

@Component({
  imports: [RouterOutlet, HeroComponent, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _movieService = inject(MovieService);
  // heroMovie = this._movieService.selectedMovie
  heroMovie = computed(() => this._movieService.selectedMovie());
  title = 'movie-project';
  showButton = false;

  constructor() {
    window.addEventListener('scroll', () => {
      this.showButton = window.scrollY > 100;
    });
  }

  goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
