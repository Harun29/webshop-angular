import { Injectable, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Item } from '../models/item.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'cartItems';
  private readonly isBrowser: boolean;

  public cartItems = signal<CartItem[]>([]);
  public totalItems = signal(0);
  public totalPrice = signal(0);

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.cartItems.set(this.loadCartItems());
    }
    this.updateTotals();
  }

  private loadCartItems(): CartItem[] {
    if (!this.isBrowser) return [];
    const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  }

  private saveCartItems() {
    if (this.isBrowser) {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartItems()));
    }
  }

  addItem(item: Item) {
    const existingItem = this.cartItems().find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.set([...this.cartItems(), { ...item, quantity: 1 }]);
    }
    this.saveCartItems();
    this.updateTotals();
  }

  removeItem(item: CartItem) {
    const existingItem = this.cartItems().find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity--;
      if (existingItem.quantity === 0) {
        this.cartItems.set(this.cartItems().filter((cartItem) => cartItem.id !== item.id));
      }
    }
    this.saveCartItems();
    this.updateTotals();
  }

  clearCart() {
    this.cartItems.set([]);
    this.saveCartItems();
    this.updateTotals();
  }

  private updateTotals() {
    this.totalItems.set(this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
    this.totalPrice.set(this.cartItems().reduce((acc, item) => acc + item.price * item.quantity, 0));
  }
}
