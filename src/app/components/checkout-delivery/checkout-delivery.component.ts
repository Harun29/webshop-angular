import {Component, Input} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {CartItem} from '../../models/cart-item.model';

@Component({
  selector: 'app-checkout-delivery',
  imports: [
    FaIconComponent
  ],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent {

  protected readonly faPlus = faPlus;
  protected readonly faCheckCircle = faCheckCircle;

  @Input() items!: CartItem[];
}
