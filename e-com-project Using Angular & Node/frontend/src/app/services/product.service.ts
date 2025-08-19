import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);
  baseUrl = "http://localhost:3000/product"; //

  getProducts() {
    return this.http.get<Product[]>(`${this.baseUrl}/viewAll`);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  addProduct(data : any) {
    return this.http.post<Product>(`${this.baseUrl}/add`, data);
  }

  updateProduct(id: string, data: Partial<Product>) {
    return this.http.put<Product>(`${this.baseUrl}/update/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete<Product>(`${this.baseUrl}/delete/${id}`);
  }
}
