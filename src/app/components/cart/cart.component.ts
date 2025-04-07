import {Component, Input} from '@angular/core';
import {CartItem} from '../../models/cart-item.model';
import {CartItemComponent} from '../cart-item/cart-item.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [
    CartItemComponent,
    NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  @Input() cartItems: Array<CartItem> = [];
}
