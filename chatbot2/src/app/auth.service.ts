import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private router: Router) {}

  get isLoggedIn$() {
    return this.isLoggedInSubject.asObservable();
  }

  signUp(user: { firstName: string; lastName: string; email: string; password: string; address: string; phone: string }): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: { email: string }) => u.email === user.email);

    if (existingUser) {
      return false; // User already exists
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true; // User successfully registered
  }

  signIn(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);

    if (user) {
      const currentUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        password: user.password,
        phone: user.phone,
        profilePicture: user.profilePicture || 'http://bootdey.com/img/Content/avatar/avatar1.png',
        cartItems: user.cartItems || [],
        orders: user.orders || []
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      localStorage.setItem('isLoggedIn', 'true'); // Set login status
      this.isLoggedInSubject.next(true);
      this.router.navigate(['/profile']);
      return true; // Successfully logged in
    }

    return false; // Invalid credentials
  }

  signOut(): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.savePreviousPeriodData(currentUser);
    }
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false'); // Clear login status
    this.clearUserCart(); // Clear user cart
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  clearUserCart(): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      currentUser.cartItems = [];
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: { email: string }) => u.email === currentUser.email);
      if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  updateUser(user: any): Observable<void> {
    return new Observable<void>((observer) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: { email: string }) => u.email === this.getCurrentUser().email);
      if (userIndex !== -1) {
        users[userIndex] = user;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));
        observer.next();
        observer.complete();
      } else {
        observer.error('User not found');
      }
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  updateUserOrders(orders: any[]): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      currentUser.orders = orders;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: { email: string }) => u.email === currentUser.email);
      if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  }

  savePreviousPeriodData(user: any): void {
    const previousData = {
      totalAmountSpent: user.totalAmountSpent || 0,
      totalItemsPurchased: user.totalItemsPurchased || 0,
      averageSpendingPerOrder: user.averageSpendingPerOrder || 0
    };
    localStorage.setItem('previousPeriodData_' + user.email, JSON.stringify(previousData));
  }

  loadPreviousPeriodData(email: string): any {
    return JSON.parse(localStorage.getItem('previousPeriodData_' + email) || '{}');
  }

  updateUserProfile(updatedUser: any): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: { email: string }) => u.email === updatedUser.email);

    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
  }

  updateProfilePicture(profilePicture: string): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      currentUser.profilePicture = profilePicture;
      this.updateUserProfile(currentUser);
    }
  }
}
