import {Component, inject, signal} from '@angular/core';
import {ShopItemsListComponent} from '../components/shop-items-list/shop-items-list.component';
import {Item} from '../models/item.model';
import { ItemsService } from '../services/items.service';
import {catchError} from 'rxjs';
import {FooterComponent} from '../components/footer/footer.component';
import {NavbarComponent} from '../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [
    ShopItemsListComponent,
    FooterComponent,
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  shopItems = signal<Array<Item>>([]);
  private itemsService = inject(ItemsService);

  ngOnInit() {
    this.itemsService.getItemsFromApi()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((items) => {
        this.shopItems.set(items);
      });
  }
}
