import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClothingItem, Review } from "./models/clothing-item.model";

@Injectable({
  providedIn: 'root'
})
export class ClothingService {
  private clothingItems: ClothingItem[] = [
    {
      id: 1,
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      type: 'Casual',
      size: 'M',
      manufacturer: 'Brand A',
      productionDate: new Date(),
      price: 19.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/42/cf/5a/42cf5ad45d3e1c061e6d86f7336c5a63.jpg'
    },
    {
      id: 2,
      name: 'Black T-shirt',
      description: 'Comfortable cotton t-shirt in black',
      type: 'Casual',
      size: 'L',
      manufacturer: 'Brand A',
      productionDate: new Date(),
      price: 21.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/d7/ab/de/d7abde31b08d7df15b1bb8e128a5697a.jpg'
    },
    {
      id: 3,
      name: 'Jeans',
      description: 'Stylish blue jeans',
      type: 'Casual',
      size: 'L',
      manufacturer: 'Brand B',
      productionDate: new Date(),
      price: 49.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/6f/c0/41/6fc041869320f5788bf2567eccd26d42.jpg'
    },
    {
      id: 4,
      name: 'Jeans',
      description: 'Slim fit jeans',
      type: 'Casual',
      size: 'M',
      manufacturer: 'Brand B',
      productionDate: new Date(),
      price: 55.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/bb/3d/a1/bb3da1fdd74be6f5768239d540562816.jpg'
    },
    {
      id: 5,
      name: 'Jacket',
      description: 'Durable winter jacket',
      type: 'Outerwear',
      size: 'L',
      manufacturer: 'Brand C',
      productionDate: new Date(),
      price: 89.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/12/2a/01/122a01af3961b972d8ac900c06016331.jpg'
    },
    {
      id: 6,
      name: 'Jacket',
      description: 'Lightweight summer jacket',
      type: 'Outerwear',
      size: 'M',
      manufacturer: 'Brand C',
      productionDate: new Date(),
      price: 79.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/00/09/98/0009981d72b2287af6987e2d1830f69a.jpg '
    },
    {
      id: 7,
      name: 'Sneakers',
      description: 'Quality running sneakers',
      type: 'Footwear',
      size: '8',
      manufacturer: 'Brand D',
      productionDate: new Date(),
      price: 59.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/24/d2/4d/24d24d34b24161598e108846dfe2ad56.jpg'
    },
    {
      id: 8,
      name: 'Sneakers',
      description: 'Casual sneakers',
      type: 'Footwear',
      size: '9',
      manufacturer: 'Brand D',
      productionDate: new Date(),
      price: 65.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/53/dd/2d/53dd2d5d755c2152f279121a58192657.jpg'
    },
    {
      id: 9,
      name: 'Dress',
      description: 'Elegant evening dress',
      type: 'Formal',
      size: 'M',
      manufacturer: 'Brand E',
      productionDate: new Date(),
      price: 99.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/13/d1/87/13d18728ea0ef62f9ac65da8e001c00e.jpg'
    },
    {
      id: 10,
      name: 'Dress',
      description: 'Casual summer dress',
      type: 'Formal',
      size: 'S',
      manufacturer: 'Brand E',
      productionDate: new Date(),
      price: 79.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/98/ad/1e/98ad1e225dcd906bb6d10909e124a796.jpg'
    },
    {
      id: 11,
      name: 'Cap',
      description: 'Elegant and stylish hat.',
      type: 'Accessories',
      size: 'One Size',
      manufacturer: 'Brand C',
      productionDate: new Date(),
      price: 24.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/c7/62/2e/c7622ed3f415431065f6deedf63040f6.jpg'
    },
    {
      id: 12,
      name: 'Cap',
      description: 'Baseball cap',
      type: 'Accessories',
      size: 'One Size',
      manufacturer: 'Brand F',
      productionDate: new Date(),
      price: 19.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/89/35/fa/8935fa7e830971d983652cf2a5f23faf.jpg '
    },
    {
      id: 13,
      name: 'Scarf',
      description: 'Warm wool scarf',
      type: 'Accessories',
      size: 'One Size',
      manufacturer: 'Brand F',
      productionDate: new Date(),
      price: 29.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/ac/01/51/ac0151cc41c379751acc0afa1c8d140e.jpg'
    },
    {
      id: 14,
      name: 'Scarf',
      description: 'Lightweight summer scarf',
      type: 'Accessories',
      size: 'One Size',
      manufacturer: 'Brand F',
      productionDate: new Date(),
      price: 19.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/9e/13/f6/9e13f6a90457ca77b1933ea3944c41a4.jpg'
    },
    {
      id: 15,
      name: 'Sunglasses',
      description: 'Stylish sunglasses',
      type: 'Accessories',
      size: 'One Size',
      manufacturer: 'Brand G',
      productionDate: new Date(),
      price: 49.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/bb/24/3f/bb243f50e3fa61538bac407885a9421c.jpg'
    },
    {
      id: 16,
      name: 'Watch',
      description: 'Elegant wrist watch',
      type: 'Accessories',
      size: 'One Size',
      manufacturer: 'Brand H',
      productionDate: new Date(),
      price: 199.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/44/f9/72/44f9721cbda958df0bfc823a595e12df.jpg'
    },
    {
      id: 17,
      name: 'Backpack',
      description: 'Durable backpack',
      type: 'Accessories',
      size: 'One Size',
      manufacturer: 'Brand F',
      productionDate: new Date(),
      price: 79.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/7a/4e/4b/7a4e4bc2ed991e4cc6c1330e2e4f9a8b.jpg'
    },
    {
      id: 18,
      name: 'Hat',
      description: 'Stylish summer hat',
      type: 'Accessories',
      size: 'One Size',
      manufacturer: 'Brand E',
      productionDate: new Date(),
      price: 34.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/736x/15/eb/30/15eb309e8bbe27c3c3f458f47d6d1a25.jpg'
    },
    {
      id: 19,
      name: 'Belt',
      description: 'Leather belt',
      type: 'Accessories',
      size: 'L',
      manufacturer: 'Brand A',
      productionDate: new Date(),
      price: 39.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/cd/59/17/cd5917dc6a6fb5dd7df1e76dd5d73bbf.jpg'
    },
    {
      id: 20,
      name: 'Gloves',
      description: 'Warm winter gloves',
      type: 'Accessories',
      size: 'M',
      manufacturer: 'Brand B',
      productionDate: new Date(),
      price: 14.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/9f/22/54/9f225471b5865306a8d16cecdf3f2657.jpg'
    },
    {
      id: 21,
      name: 'Running Shoes',
      description: 'Comfortable running shoes for daily wear',
      type: 'Footwear',
      size: 'L',
      manufacturer: 'Brand C',
      productionDate: new Date(),
      price: 49.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/17/ed/84/17ed84133aa50a2a16317e89a68e643f.jpg'
    },
    {
      id: 22,
      name: 'T-Shirt',
      description: 'Stylish casual shirt for everyday use',
      type: 'Casual',
      size: 'M',
      manufacturer: 'Brand A',
      productionDate: new Date(),
      price: 24.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/cc/cf/11/cccf11391d8ef5d5ca4186d3a606f2a9.jpg'
    },
    {
      id: 23,
      name: 'Leather Jacket',
      description: 'Durable and stylish leather jacket',
      type: 'Outerwear',
      size: 'XL',
      manufacturer: 'Brand B',
      productionDate: new Date(),
      price: 99.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/31/a8/2a/31a82a3c0f2ae03053ae200462fe82bf.jpg'
    },
    {
      id: 24,
      name: 'Formal Shoes',
      description: 'Elegant formal shoes for business occasions',
      type: 'Footwear',
      size: 'M',
      manufacturer: 'Brand E',
      productionDate: new Date(),
      price: 79.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/736x/cb/3a/8d/cb3a8dd97cc301e3d9b1fdbf9d1091e2.jpg'
    },
    {
      id: 25,
      name: 'Summer Dress',
      description: 'Lightweight summer dress for casual outings',
      type: 'Formal',
      size: 'S',
      manufacturer: 'Brand F',
      productionDate: new Date(),
      price: 34.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/62/58/cc/6258cc29d539d3c22ffb90aec89394c2.jpg'
    },
    {
      id: 26,
      name: 'Sneakers',
      description: 'Trendy sneakers for everyday wear',
      type: 'Footwear',
      size: 'M',
      manufacturer: 'Brand D',
      productionDate: new Date(),
      price: 39.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/32/a9/02/32a90221be0521fcf002296260956882.jpg'
    },
    {
      id: 27,
      name: 'T-Shirt',
      description: 'Classic polo shirt for casual and semi-formal wear',
      type: 'Casual',
      size: 'L',
      manufacturer: 'Brand A',
      productionDate: new Date(),
      price: 29.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/c9/24/52/c92452f990eb7f053baff6f360b4e6ef.jpg'
    },
    {
      id: 28,
      name: 'Denim Jeans',
      description: 'Stylish denim jeans for everyday wear',
      type: 'Casual',
      size: 'M',
      manufacturer: 'Brand B',
      productionDate: new Date(),
      price: 59.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/26/da/68/26da68d20f16eae3397551d7bce5683a.jpg'
    },
    {
      id: 29,
      name: 'Hiking Boots',
      description: 'Durable hiking boots for outdoor adventures',
      type: 'Footwear',
      size: 'XL',
      manufacturer: 'Brand C',
      productionDate: new Date(),
      price: 89.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/c2/94/12/c29412e984db1ad4b574ee401ba58153.jpg'
    },
    {
      id: 30,
      name: 'Beanie Hat',
      description: 'Warm beanie hat for cold weather',
      type: 'Accessories',
      size: 'One Size',
      manufacturer: 'Brand D',
      productionDate: new Date(),
      price: 14.99,
      reviews: [],
      imageUrl: 'https://i.pinimg.com/564x/dd/67/a1/dd67a16b1a4b22ce939c78451ed6837e.jpg'
    }
  ];


  constructor() {
    this.loadReviewsFromLocalStorage();

  }

  getClothingItems(): Observable<ClothingItem[]> {
    return of(this.clothingItems);
  }

  getClothingItem(id: number): Observable<ClothingItem | undefined> {
    const item = this.clothingItems.find(item => item.id === id);
    return of(item);
  }

  addReviewToItem(id: number, review: Review): Observable<void> {
    const item = this.clothingItems.find(item => item.id === id);
    if (item) {
      item.reviews.push(review);
      this.saveReviewsToLocalStorage();
      this.calculateAverageRating(item); // Recalculate the rating
    }
    return of();
  }

  private calculateAverageRatings(): void {
    this.clothingItems.forEach(item => {
      this.calculateAverageRating(item);
    });
  }

  private calculateAverageRating(item: ClothingItem): void {
    if (item.reviews.length > 0) {
      const totalRating = item.reviews.reduce((sum, review) => sum + review.rating, 0);
      item.rating = totalRating / item.reviews.length;
    } else {
      item.rating = 0; // If no reviews, set rating to 0
    }
  }

  private loadReviewsFromLocalStorage(): void {
    const storedItems = localStorage.getItem('clothingItems');
    if (storedItems) {
      this.clothingItems = JSON.parse(storedItems);
    }
  }

  private saveReviewsToLocalStorage(): void {
    localStorage.setItem('clothingItems', JSON.stringify(this.clothingItems));
  }

  searchClothingItems(criteria: any): Observable<ClothingItem[]> {
    let filteredItems = this.clothingItems.filter(item => {
      return (!criteria.name || item.name.toLowerCase().includes(criteria.name.toLowerCase())) &&
        (!criteria.description || item.description.toLowerCase().includes(criteria.description.toLowerCase())) &&
        (!criteria.type || item.type.toLowerCase().includes(criteria.type.toLowerCase())) &&
        (!criteria.size || item.size.toLowerCase().includes(criteria.size.toLowerCase())) &&
        (!criteria.manufacturer || item.manufacturer.toLowerCase().includes(criteria.manufacturer.toLowerCase())) &&
        (!criteria.fromDate || new Date(item.productionDate) >= new Date(criteria.fromDate)) &&
        (!criteria.toDate || new Date(item.productionDate) <= new Date(criteria.toDate)) &&
        (!criteria.minPrice || item.price >= criteria.minPrice) &&
        (!criteria.maxPrice || item.price <= criteria.maxPrice);
    });

    return of(filteredItems);
  }
}
