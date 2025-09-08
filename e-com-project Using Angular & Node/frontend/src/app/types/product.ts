export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string[];
  categoryId: string;
}
