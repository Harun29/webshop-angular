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
import {UserService} from '../services/user.service';
import {Address} from '../models/address.model';
import {AddressService} from '../services/address.service';

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
  isOnPayment = signal(false);

  userService = inject(UserService);
  addresses: Address[] = [];

  ngOnInit() {
    this.addressService.getAddresses().subscribe((data) => {
      this.addresses = data;
    })
  }

  cartService = inject(CartService);
  addressService = inject(AddressService);
  totalPrice = this.cartService.totalPrice;
  cartItems = this.cartService.cartItems;

  changeToPayment() {
    this.isOnDelivery.set(false);
    this.isOnPayment.set(true);
  }

  changeToDelivery() {
    this.isOnDelivery.set(true);
    this.isOnPayment.set(false);
  }

}
