import { inject,Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);

  constructor() { }

  getProducts(){
    return this.http.get<Product[]>("http://localhost:3000/Product/viewAll");
  }
  getProductById(id:string){
    return this.http.get<Product>("http://localhost:3000/Product/"+id);
  }
  addProduct(data: { name: string }) {
    return this.http.post("http://localhost:3000/Product/add", data);
  }
  updateProduct(id: string, name: string) {
    return this.http.put(`http://localhost:3000/Product/update/${id}`, { name });
  }
  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/Product/delete/${id}`);
  }
}
