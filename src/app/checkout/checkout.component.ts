import {Component, inject, signal} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {faArrowCircleRight} from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {CheckoutDeliveryComponent} from '../components/checkout-delivery/checkout-delivery.component';
import {CartService} from '../services/cart.service';
import {RouterLink} from '@angular/router';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import {CheckoutPaymentComponent} from '../components/checkout-payment/checkout-payment.component';

@Component({
  selector: 'app-checkout',
  imports: [
    FaIconComponent,
    CheckoutDeliveryComponent,
    RouterLink,
    CheckoutPaymentComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faArrowRight = faArrowRight;
  protected readonly faArrowCircleRight = faArrowCircleRight;
  protected readonly faCheck = faCheck;
  protected readonly faCircleCheck = faCircleCheck;
  isOnDelivery = signal(true);

  cartService = inject(CartService);
  totalPrice = this.cartService.totalPrice;
  cartItems = this.cartService.cartItems;

  changeToPayment() {
    this.isOnDelivery.set(false);
  }

  changeToDelivery() {
    this.isOnDelivery.set(true);
  }

}
