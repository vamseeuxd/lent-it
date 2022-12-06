import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaders: number[] = [];

  get isLoader(): boolean {
    return this.loaders.length > 0;
  }

  show(): number {
    const id = new Date().getTime();
    this.loaders.push(id);
    return id;
  }

  hide(id: number) {
    this.loaders = this.loaders.filter((_id) => _id !== id);
  }
}
