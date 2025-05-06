import { Component, inject, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { CheckoutDeliveryComponent } from '../components/checkout-delivery/checkout-delivery.component';
import { CartService } from '../services/cart.service';
import { RouterLink } from '@angular/router';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import { CheckoutPaymentComponent } from '../components/checkout-payment/checkout-payment.component';
import { UserService } from '../services/user.service';
import { AddressService } from '../services/address.service';
import { OrderService } from '../services/order.service'; // Import the OrderService
import { OrderRequest } from '../models/order.model'; // Import the OrderRequest model
import { Address } from '../models/address.model';

@Component({
  selector: 'app-checkout',
  imports: [
    FaIconComponent,
    CheckoutDeliveryComponent,
    RouterLink,
    CheckoutPaymentComponent,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faArrowRight = faArrowRight;
  protected readonly faArrowCircleRight = faArrowCircleRight;
  protected readonly faCheck = faCheck;
  protected readonly faCircleCheck = faCircleCheck;

  orderSuccess = signal(false);
  isOnDelivery = signal(true);
  isOnPayment = signal(false);

  // Inject required services
  userService = inject(UserService);
  cartService = inject(CartService);
  addressService = inject(AddressService);
  orderService = inject(OrderService);
  shippingAddress: Address | null = null;
  paymentMethod: string | null = null;

  addresses: Address[] = [];
  totalPrice = this.cartService.totalPrice;
  cartItems = this.cartService.cartItems;

  // Error message for handling errors
  errorMessage: string | null = null;

  ngOnInit() {
    this.addressService.getAddresses().subscribe((data) => {
      this.addresses = data;
    });
  }

  // Navigate to payment step
  changeToPayment() {
    this.isOnDelivery.set(false);
    this.isOnPayment.set(true);
  }

  changeToDelivery() {
    this.isOnDelivery.set(true);
    this.isOnPayment.set(false);
  }

  onProceedClick() {
    if (this.isOnDelivery()) {
      if (!this.shippingAddress) {
        this.errorMessage = 'Please select a shipping address.';
        return;
      }
      this.changeToPayment();
    } else {
      if (!this.paymentMethod || !this.shippingAddress) {
        this.errorMessage = 'Please select a payment method and delivery address.';
        return;
      }
      this.createOrder(this.paymentMethod, this.shippingAddress);
    }
  }


  createOrder(paymentMethod: string, shippingAddress: Address) {
    if (this.cartItems().length === 0) {
      this.errorMessage = 'Your cart is empty. Please add items to the cart.';
      return;
    }

    const orderRequest: OrderRequest = {
      items: this.cartItems().map(item => ({
        productId: Number(item.id),
        quantity: item.quantity,
      })),
      addressId: shippingAddress.id,
      paymentMethod: paymentMethod,
    };

    this.orderService.createOrder(orderRequest).subscribe({
      next: (order) => {
        console.log('Order created successfully:', order);
        this.orderSuccess.set(true);
        this.cartService.clearCart();
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = err.message;
        console.error('Order creation failed:', err);
      }
    });
  }

}
