import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  private readonly DEFAULT_POSTER_PATH = './assets/images/default-poster.png';
  private readonly BACKDROP_PATH = './assets/images/default-backdrop.png';

  getImageUrl(
    posterPath: string | null,
    type: 'poster' | 'backdrop' = 'poster'
  ): string {
    if (!posterPath) {
      return type === 'poster' ? this.DEFAULT_POSTER_PATH : this.BACKDROP_PATH;
    }
    return `${this.IMAGE_BASE_URL}${posterPath}`;
  }
}
