// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { ClothingItem } from '../models/clothing-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: ClothingItem[] = [];

  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.cartItems.forEach(item => {
      if (!item.quantity) {
        item.quantity = 1;  // Ensure quantity is initialized
      }
    });
  }

  removeFromCart(index: number): void {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCartItems(); // Update cart items after removal
  }

  updatePrice(item: ClothingItem): void {
    if (!item.quantity) {
      item.quantity = 1;
    }
  }

  calculateLinePrice(item: ClothingItem): number {
    return item.price * (item.quantity || 1);
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  }

  calculateShipping(): string {
    const total = this.calculateSubtotal();
    if (total > 150) {
      return 'Free Shipping';
    } else if (total < 20) {
      return '$10 Shipping';
    } else {
      return '$20 Shipping';
    }
  }

  calculateTotalPriceWithShipping(): number {
    const subtotal = this.calculateSubtotal();
    const shipping = this.calculateShippingCost();
    return subtotal + shipping;
  }

  calculateShippingCost(): number {
    const subtotal = this.calculateSubtotal();
    if (subtotal >= 150) {
      return 0;
    } else if (subtotal < 20) {
      return 10;
    } else {
      return 20;
    }
  }

  checkout(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      if (!currentUser.orders) {
        currentUser.orders = [];
      }

      // Add each item to the user's orders based on the quantity
      this.cartItems.forEach(item => {
        const quantity = item.quantity ?? 1; // Use quantity or fallback to 1
        for (let i = 0; i < quantity; i++) {
          currentUser.orders.push({...item}); // Push a copy of the item to the orders array
        }
      });

      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.authService.updateUserOrders(currentUser.orders);
    }

    this.cartService.emptyCart();
    this.cartItems = []; // Clear cart items in the component
    this.authService.clearUserCart(); // Clear user cart
  }




  empty(): void {
    this.cartService.emptyCart();
    this.cartItems = []; // Clear cart items in the component
  }
}
