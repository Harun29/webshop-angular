import {Component, Input, OnInit} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {CartItem} from '../../models/cart-item.model';
import {Address} from '../../models/address.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-checkout-delivery',
  imports: [
    FaIconComponent,
    NgIf
  ],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss'
})
export class CheckoutDeliveryComponent implements OnInit {

  protected readonly faPlus = faPlus;
  protected readonly faCheckCircle = faCheckCircle;

  selectedAddress!: Address;

  @Input() addresses!: Address[];
  @Input() items!: CartItem[];

  ngOnInit(): void {
    if (this.addresses && this.addresses.length > 0) {
      this.selectedAddress = this.addresses[0];
    }
  }

  setSelectAddress(address: Address) {
    this.selectedAddress = address;
  }
}
