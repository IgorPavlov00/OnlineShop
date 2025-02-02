import { Injectable } from '@angular/core';
import { ClothingItem } from './models/clothing-item.model';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: ClothingItem[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);

  constructor(private authService: AuthService) {
    this.updateCartItemCount();
  }

  addToCart(item: ClothingItem, quantity: number = 1): void {
    const currentUser = this.authService.getCurrentUser();
    let cartItems = currentUser ? currentUser.cartItems || [] : this.cartItems;

    const existingItem = cartItems.find((cartItem: { id: number; }) => cartItem.id === item.id);

    if (existingItem) {
      // If the item already exists in the cart, increment the quantity
      existingItem.quantity = (existingItem.quantity || 0) + quantity;
    } else {
      // If the item doesn't exist, add it with the specified quantity
      cartItems.push({ ...item, quantity: quantity });
    }

    if (currentUser) {
      currentUser.cartItems = cartItems;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      this.cartItems = cartItems;
    }

    this.updateCartItemCount();
  }





  getCartItems(): ClothingItem[] {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.cartItems || [] : this.cartItems;
  }

  removeFromCart(index: number): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.cartItems) {
      currentUser.cartItems.splice(index, 1);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      this.cartItems.splice(index, 1);
    }
    this.updateCartItemCount();
  }

  emptyCart(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      currentUser.cartItems = [];
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      this.cartItems = [];
    }
    this.updateCartItemCount();
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }

  private updateCartItemCount(): void {
    const currentUser = this.authService.getCurrentUser();
    const count = currentUser ? (currentUser.cartItems ? currentUser.cartItems.length : 0) : this.cartItems.length;
    this.cartItemCount.next(count);
  }


}
