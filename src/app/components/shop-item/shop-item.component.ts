import {Component, Input} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';
import {Item} from '../../models/item.model';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-shop-item',
    imports: [
        FaIconComponent,
    ],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss'
})
export class ShopItemComponent {
  protected readonly faCartPlus = faCartPlus;
  @Input() item!: Item;

  constructor(private readonly cartService: CartService) {
  }

  addToCart() {
    this.cartService.addItem(this.item);
  }
}
