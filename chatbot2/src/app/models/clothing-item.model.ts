export interface Review {
  text: string;
  rating: number;
  user: string;
  helpful: number;
  date: Date;
}

export interface ClothingItem {
  id: number;
  name: string;
  description: string;
  type: string;
  size: string;
  manufacturer: string;
  productionDate: Date;
  price: number;
  reviews: Review[];
  imageUrl: string;
  quantity?: number;
  rating?: number; // Add rating property
}
export class User {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  password: string = '';
  phone: string = '';
  cartItems: any[] = [];
  orders: any[] = [];
}
