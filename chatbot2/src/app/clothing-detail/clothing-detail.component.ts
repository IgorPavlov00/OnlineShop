import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClothingItem, Review } from '../models/clothing-item.model';
import { ClothingService } from "../clothing.service";
import { CartService } from "../cart.service";
import { AuthService } from '../auth.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-clothing-detail',
  templateUrl: './clothing-detail.component.html',
  styleUrls: ['./clothing-detail.component.css']
})
export class ClothingDetailComponent implements OnInit {
  clothingItem: ClothingItem | undefined;
  newReview: Review = {
    text: '',
    rating: 5,
    user: '',
    helpful: 0,
    date: new Date()
  };
  averageRating: number | null = null;
  reviewsPerPage = 3;
  currentPage = 1;
  totalPages = 1;
  quantity: number = 1; // Default quantity is 1


  get paginatedReviews(): Review[] {
    if (!this.clothingItem) return [];
    const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
    const endIndex = startIndex + this.reviewsPerPage;
    return this.clothingItem.reviews.slice(startIndex, endIndex);
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  constructor(
    private route: ActivatedRoute,
    private clothingService: ClothingService,
    private cartService: CartService,
    private authService: AuthService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clothingService.getClothingItem(+id).subscribe(item => {
        this.clothingItem = item;
        this.calculateAverageRating();
        this.calculatePagination();
      });
    }
  }

  calculateAverageRating(): void {
    if (this.clothingItem && this.clothingItem.reviews.length > 0) {
      const ratings = this.clothingItem.reviews.map(review => parseFloat(review.rating.toString()));
      const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
      this.averageRating = parseFloat((totalRating / ratings.length).toFixed(1));
    } else {
      this.averageRating = null;
    }
  }

  calculatePagination(): void {
    if (this.clothingItem) {
      this.totalPages = Math.ceil(this.clothingItem.reviews.length / this.reviewsPerPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  addToCart(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.toast.error('Please log in or register to add items to the cart.');
      return;
    }

    if (this.clothingItem) {
      this.cartService.addToCart(this.clothingItem, this.quantity); // Pass quantity here
      this.toast.success('Item added to cart!');
    }
  }






  submitReview(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.toast.error('Please log in or register to submit a review.');
      return;
    }

    if (!currentUser.firstName || !currentUser.lastName) {
      this.toast.error('User information is incomplete.');
      return;
    }

    this.newReview.user = `${currentUser.firstName} ${currentUser.lastName}`;
    this.newReview.date = new Date();
    this.calculateAverageRating();
    if (this.clothingItem) {
      this.clothingService.addReviewToItem(this.clothingItem.id, this.newReview).subscribe(() => {
        if (this.clothingItem) {
          this.clothingItem.reviews.push({ ...this.newReview });
          this.calculatePagination();
          this.newReview = {
            text: '',
            rating: 5,
            user: '',
            helpful: 0,
            date: new Date()
          };
        }
      });
      window.location.reload()
    }
  }
}
