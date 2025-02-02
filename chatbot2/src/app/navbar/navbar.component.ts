import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('bopAnimation', [
      state('false', style({ transform: 'scale(1)' })),
      state('true', style({ transform: 'scale(1.1)' })),
      transition('false => true', animate('100ms ease-in')),
      transition('true => false', animate('100ms ease-out'))
    ])
  ]
})
export class NavbarComponent implements OnInit {
  cartItemCount: number = 0;
  animateCart: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCartItemCount().subscribe((count: number) => {
      this.cartItemCount = count;
      this.bopCartIcon();
    });
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  bopCartIcon(): void {
    this.animateCart = true;
    setTimeout(() => this.animateCart = false, 300);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
