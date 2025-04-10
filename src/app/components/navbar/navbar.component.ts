import {Component, HostListener, inject} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowRight, faCartShopping, faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import {CartService} from '../../services/cart.service';
import {NgIf} from '@angular/common';
import {CartComponent} from '../cart/cart.component';
import {SwipeDownDirective} from '../../directives/swipe-down.directive';

@Component({
  selector: 'app-navbar',
  imports: [
    FaIconComponent,
    NgIf,
    CartComponent,
    SwipeDownDirective
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isVisible = false;
  isExpanded = false;
  cartService = inject(CartService);
  totalItems = this.cartService.totalItems;
  totalPrice = this.cartService.totalPrice;
  cartItems = this.cartService.cartItems;
  protected readonly faCartShopping = faCartShopping;
  protected readonly faShoppingBasket = faShoppingBasket;
  protected readonly faArrowRight = faArrowRight;

  constructor() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isVisible = scrollPosition > 100;
  }

  toggleCart() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}
