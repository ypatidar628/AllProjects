export interface Product {
  _id: string; // Optional when creating a product
  name: string;
  shotDescription: string;
  description: string;
  price: number;
  discount: number;
  image: string[];
  categoryId: string;
}
