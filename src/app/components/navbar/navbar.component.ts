import {Component, HostListener, inject, output, signal} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowRight, faCartShopping} from '@fortawesome/free-solid-svg-icons';
import {CartService} from '../../services/cart.service';
import {NgClass, NgIf} from '@angular/common';
import {CartComponent} from '../cart/cart.component';
import {SwipeDownDirective} from '../../directives/swipe-down.directive';
import {RouterLink} from '@angular/router';
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {pages} from '../../models/pages.model';

@Component({
  selector: 'app-navbar',
  imports: [
    FaIconComponent,
    NgIf,
    CartComponent,
    SwipeDownDirective,
    RouterLink,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  protected readonly pages = pages;

  isVisible = window.screen.width > 1024;
  isDesktop = window.screen.width > 1024;
  isExpanded = false;
  cartService = inject(CartService);
  pageToggled = output<pages>();
  selectedPage = signal<pages>(pages.HOME);

  totalPrice = this.cartService.totalPrice;
  cartItems = this.cartService.cartItems;
  protected readonly faCartShopping = faCartShopping;
  protected readonly faArrowRight = faArrowRight;
  protected readonly faHouse = faHouse;
  protected readonly faUser = faUser;

  constructor() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if(window.screen.width > 1024) return;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isVisible = scrollPosition > 100;
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.isDesktop = window.screen.width > 1024;
  }

  toggleCart() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  resetOverflow() {
    document.body.style.overflow = '';
  }

  togglePage(page: pages) {
    this.selectedPage.set(page);
    this.pageToggled.emit(page);
  }

}
