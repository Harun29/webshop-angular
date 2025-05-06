import {Component, EventEmitter, Output, signal} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCircle} from '@fortawesome/free-solid-svg-icons/faCircle';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import {faCreditCard} from '@fortawesome/free-solid-svg-icons/faCreditCard';
import {faPaypal} from '@fortawesome/free-brands-svg-icons/faPaypal';
import {faBank} from '@fortawesome/free-solid-svg-icons/faBank';

enum PaymentMethod {
  CreditCard,
  PayPal,
  BankTransfer
}

@Component({
  selector: 'app-checkout-payment',
    imports: [
        FaIconComponent,
    ],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.scss'
})
export class CheckoutPaymentComponent {
  protected readonly faCircle = faCircle;
  protected readonly faCircleCheck = faCircleCheck;
  protected readonly faCreditCard = faCreditCard;
  protected readonly faPaypal = faPaypal;
  protected readonly faBank = faBank;
  public PaymentMethod = PaymentMethod;

  selectedPaymentMethod = signal(PaymentMethod.CreditCard)
  @Output() paymentMethodChange = new EventEmitter<string>();

  changePaymentMethod(method: PaymentMethod) {
    this.selectedPaymentMethod.set(method);
    this.paymentMethodChange.emit(PaymentMethod[method]);
  }
}

