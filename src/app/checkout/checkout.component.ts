import {Component, inject} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {CheckoutDeliveryComponent} from '../components/checkout-delivery/checkout-delivery.component';
import {CartService} from '../services/cart.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [
    FaIconComponent,
    CheckoutDeliveryComponent,
    RouterLink,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faArrowCircleRight = faArrowCircleRight;
  protected readonly faCheck = faCheck;

  cartService = inject(CartService);
  totalPrice = this.cartService.totalPrice;
  cartItems = this.cartService.cartItems;
}
