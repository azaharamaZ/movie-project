import { Routes } from '@angular/router';

const moviesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./movie.component').then((m) => m.MovieComponent),
  },
  {
    path: ':movieId',
    loadComponent: () =>
      import('./movie-details/movie-details.component').then(
        (m) => m.MovieDetailsComponent
      ),
  },
];

export { moviesRoutes };
