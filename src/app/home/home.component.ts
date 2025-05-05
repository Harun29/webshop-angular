import { Component, inject, signal } from '@angular/core';
import { ShopItemsListComponent } from '../components/shop-items-list/shop-items-list.component';
import { Item } from '../models/item.model'; // This is your frontend model
import { ProductService } from '../services/product.service'; // Updated import
import { catchError } from 'rxjs';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { pages } from '../models/pages.model';
import { ProfileComponent } from '../components/profile/profile.component';

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
  private readonly productService = inject(ProductService);
  protected readonly pages = pages;

  ngOnInit() {
    this.productService.getAllProducts()
      .pipe(
        catchError((err) => {
          console.log(err);
          throw err;
        })
      )
      .subscribe((products) => {
        const items: Item[] = products.map(product => ({
          id: product.id.toString(),
          name: product.name,
          price: product.price,
          image: product.imageUrl,
          description: product.description
        }));
        this.shopItems.set(items);
      });
  }

  togglePage(page: pages) {
    this.selectedPage.set(page);
    console.log(`Selected page: ${page}`);
  }
}
