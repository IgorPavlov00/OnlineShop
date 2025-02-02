import { Component } from '@angular/core';
import { ClothingItem } from '../models/clothing-item.model';
import {ClothingService} from "../clothing.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchCriteria = {
    name: '',
    description: '',
    type: '',
    size: '',
    manufacturer: '',
    fromDate: '',
    toDate: '',
    minPrice: '',
    maxPrice: ''
  };

  clothingItems: ClothingItem[] = [];

  constructor(private clothingService: ClothingService,private router: Router) {}

  search(): void {
    this.clothingService.searchClothingItems(this.searchCriteria).subscribe((items: ClothingItem[]) => this.clothingItems = items);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/clothing', id]); // Adjusted to match the defined route
  }
}
