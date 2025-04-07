import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Item} from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  http = inject(HttpClient);

  getItemsFromApi() {
    return this.http.get<Array<Item>>('https://jsonfakery.com/products/random/10')
  }
  constructor() { }
}
