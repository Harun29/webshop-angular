import {Component, inject, signal} from '@angular/core';
import {ShopItemsListComponent} from '../components/shop-items-list/shop-items-list.component';
import {Item} from '../models/item.model';
import { ItemsService } from '../services/items.service';
import {catchError} from 'rxjs';
import {FooterComponent} from '../components/footer/footer.component';
import {NavbarComponent} from '../components/navbar/navbar.component';
import {pages} from '../models/pages.model';
import {ProfileComponent} from '../components/profile/profile.component';

@Component({
  selector: 'app-home',
  imports: [
    ShopItemsListComponent,
    FooterComponent,
    NavbarComponent,
    ProfileComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  shopItems = signal<Array<Item>>([]);
  selectedPage = signal<pages>(pages.HOME);
  private readonly itemsService = inject(ItemsService);
  protected readonly pages = pages;

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

  togglePage(page: pages) {
    this.selectedPage.set(page);
    console.log(`Selected page: ${page}`);
  }

}
