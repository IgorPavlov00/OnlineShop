import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  cartItems: any[] = [];
  totalAmountSpent: number = 0;
  totalItemsPurchased: number = 0;
  averageSpendingPerOrder: number = 0;
  favoriteProducts: { name: string, count: number, imageUrl: string }[] = [];

  previousTotalAmountSpent: number = 0;
  previousTotalItemsPurchased: number = 0;
  previousAverageSpendingPerOrder: number = 0;

  totalAmountSpentChange: number = 0;
  totalItemsPurchasedChange: number = 0;
  averageSpendingPerOrderChange: number = 0;

  // Pagination variables
  itemsPerPage: number = 5;
  currentPage: number = 1;
  pagedItems: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser && this.currentUser.orders) {
      this.cartItems = this.currentUser.orders;
      this.loadPreviousPeriodData();
      this.calculateTotalAmountSpent();
      this.calculateTotalItemsPurchased();
      this.calculateAverageSpendingPerOrder();
      this.calculateChanges();
      this.updatePagedItems();
      this.calculateFavoriteProducts();
    }
  }

  loadPreviousPeriodData(): void {
    const previousData = JSON.parse(localStorage.getItem('previousPeriodData') || '{}');
    this.previousTotalAmountSpent = previousData.totalAmountSpent || 0;
    this.previousTotalItemsPurchased = previousData.totalItemsPurchased || 0;
    this.previousAverageSpendingPerOrder = previousData.averageSpendingPerOrder || 0;
  }

  saveCurrentPeriodData(): void {
    const currentData = {
      totalAmountSpent: this.totalAmountSpent,
      totalItemsPurchased: this.totalItemsPurchased,
      averageSpendingPerOrder: this.averageSpendingPerOrder
    };
    localStorage.setItem('previousPeriodData', JSON.stringify(currentData));
  }

  calculateTotalAmountSpent(): void {
    this.totalAmountSpent = this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  calculateTotalItemsPurchased(): void {
    this.totalItemsPurchased = this.cartItems.length;
  }

  calculateAverageSpendingPerOrder(): void {
    const numberOfOrders = this.cartItems.length;
    if (numberOfOrders > 0) {
      this.averageSpendingPerOrder = this.totalAmountSpent / numberOfOrders;
    } else {
      this.averageSpendingPerOrder = 0;
    }
  }

  calculateChanges(): void {
    this.totalAmountSpentChange = this.calculatePercentageChange(this.previousTotalAmountSpent, this.totalAmountSpent);
    this.totalItemsPurchasedChange = this.calculatePercentageChange(this.previousTotalItemsPurchased, this.totalItemsPurchased);
    this.averageSpendingPerOrderChange = this.calculatePercentageChange(this.previousAverageSpendingPerOrder, this.averageSpendingPerOrder);
    this.saveCurrentPeriodData();
  }

  calculatePercentageChange(previous: number, current: number): number {
    if (previous === 0) return current === 0 ? 0 : 100;
    return ((current - previous) / previous) * 100;
  }

  signOut(): void {
    this.authService.signOut();
  }

  // Pagination methods
  updatePagedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedItems = this.cartItems.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.currentPage = page;
    this.updatePagedItems();
  }

  totalPages(): number {
    return Math.ceil(this.cartItems.length / this.itemsPerPage);
  }

  calculateFavoriteProducts(): void {
    const productCounts: { [name: string]: { count: number, imageUrl: string } } = {};

    this.cartItems.forEach(item => {
      if (!productCounts[item.name]) {
        productCounts[item.name] = { count: 0, imageUrl: item.imageUrl };
      }
      productCounts[item.name].count++;
    });

    this.favoriteProducts = Object.keys(productCounts)
      .map(key => ({
        name: key,
        count: productCounts[key].count,
        imageUrl: productCounts[key].imageUrl
      }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)).slice(0, 3); // Sort by count, then by name
  }
}
