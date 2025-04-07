import {Component, Input, inject} from '@angular/core';
import {CartItem} from '../../models/cart-item.model';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() item!: CartItem;
  cartService = inject(CartService);

  addToCart() {
    this.cartService.addItem(this.item);
  }
  removeFromCart() {
    this.cartService.removeItem(this.item);
  }
}
