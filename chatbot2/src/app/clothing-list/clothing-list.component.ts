import { Component, OnInit } from '@angular/core';
import { ClothingItem, Review } from '../models/clothing-item.model';
import { ClothingService } from "../clothing.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "../cart.service";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-clothing-list',
  templateUrl: './clothing-list.component.html',
  styleUrls: ['./clothing-list.component.css']
})
export class ClothingListComponent implements OnInit {
  clothingItems: ClothingItem[] = [];
  filteredItems: ClothingItem[] = [];
  pagedItems: ClothingItem[] = [];
  itemsPerPage: number = 6;
  currentPage: number = 1;
  totalPages: number = 0;
  selectedCategory: string = '';

  totalPagesArray: number[] = [];
  searchCriteria: {
    name: string,
    description: string,
    type: string,
    size: string,
    manufacturer: string,
    fromDate: string,
    toDate: string,
    minPrice: number,
    maxPrice: number,
    brands: {
      [key: string]: boolean;
    },
    ratings: {
      1: boolean,
      2: boolean,
      3: boolean,
      4: boolean,
      5: boolean,
    },
  } = {
    name: '',
    description: '',
    type: '',
    size: '',
    manufacturer: '',
    fromDate: '',
    toDate: '',
    minPrice: 0,
    maxPrice: 0,
    brands: {
      'Brand A': false,
      'Brand B': false,
      'Brand C': false,
      'Brand D': false,
      'Brand E': false,
    },
    ratings: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    },
  };

  constructor(private clothingService: ClothingService, private router: Router, private cartService: CartService,
              private authService: AuthService, private toast: ToastrService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.clothingService.getClothingItems().subscribe(items => {
      this.clothingItems = items;
      this.filteredItems = items;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredItems = this.clothingItems.filter(item => {
      const matchesBrand = !Object.values(this.searchCriteria.brands).includes(true) || this.searchCriteria.brands[item.manufacturer as keyof typeof this.searchCriteria.brands];

      const averageRating = this.getAverageRating(item.reviews);
      const matchesRating = !Object.values(this.searchCriteria.ratings).includes(true) || this.matchesRatingRange(averageRating);

      const matchesCategory = !this.selectedCategory || item.type === this.selectedCategory;

      return matchesBrand && matchesRating && matchesCategory;
    });
    this.updatePagination();
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  matchesRatingRange(averageRating: number): boolean {
    if (averageRating === 0) return this.searchCriteria.ratings[1];
    if (averageRating >= 4.5) return this.searchCriteria.ratings[5];
    if (averageRating >= 3.5) return this.searchCriteria.ratings[4];
    if (averageRating >= 2.5) return this.searchCriteria.ratings[3];
    if (averageRating >= 1.5) return this.searchCriteria.ratings[2];
    return this.searchCriteria.ratings[1];
  }

  getAverageRating(reviews: Review[]): number {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }

  search(): void {
    this.clothingService.searchClothingItems(this.searchCriteria).subscribe((items: ClothingItem[]) => {
      this.clothingItems = items;
      this.applyFilters();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (v, k) => k + 1);
    this.updatePagedItems();
  }

  updatePagedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedItems = this.filteredItems.slice(startIndex, endIndex);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/clothing', id]);
  }

  addToCart(id: number, quantity: number = 1): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.toast.error('Please log in or register to add items to the cart.');
      return;
    }

    const item = this.clothingItems.find(item => item.id === id);
    if (item) {
      this.cartService.addToCart(item, quantity); // Pass quantity here
      this.toast.success('Item added to cart!');
    } else {
      this.toast.error('Item not found.');
    }
  }




  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedItems();
  }

  getCategoryCount(category: string): number {
    switch(category) {
      case 'Shirts':
        return this.clothingItems.filter(item => item.name.toLowerCase().includes('shirt')).length;
      case 'Jeans':
        return this.clothingItems.filter(item => item.name.toLowerCase().includes('jeans')).length;
      case 'Jackets':
        return this.clothingItems.filter(item => item.name.toLowerCase().includes('jacket')).length;
      case 'Sneakers':
        return this.clothingItems.filter(item => item.name.toLowerCase().includes('sneakers') || item.name.toLowerCase().includes('boots')).length;
      case 'Dresses':
        return this.clothingItems.filter(item => item.name.toLowerCase().includes('dress')).length;
      case 'Accessories':
        return this.clothingItems.filter(item =>
          !item.name.toLowerCase().includes('shirt') &&
          !item.name.toLowerCase().includes('jeans') &&
          !item.name.toLowerCase().includes('jacket') &&
          !item.name.toLowerCase().includes('sneakers') &&
          !item.name.toLowerCase().includes('boots') &&
          !item.name.toLowerCase().includes('dress')
        ).length;
      default:
        return 0;
    }
  }



  getStarArray(reviews: Review[]): number[] {
    const ratings = reviews.map(review => parseFloat(review.rating.toString()));
    const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);
    const averageRating = reviews.length ? totalRating / reviews.length : 0;
    return Array(Math.round(averageRating)).fill(1).map((x, i) => i);
  }
}
