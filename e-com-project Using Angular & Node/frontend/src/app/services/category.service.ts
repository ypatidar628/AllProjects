import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
http = inject(HttpClient);
  constructor() { }

  getCategories(){
    return this.http.get<Category[]>("http://localhost:3000/category/view");
  }
  getCategoryById(id:string){
    return this.http.get<Category>("http://localhost:3000/category/"+id);
  }
  addCategory(data: { name: string }) {
    return this.http.post("http://localhost:3000/category/add", data);
  }
  updateCategory(id: string, name: string) {
    return this.http.put(`http://localhost:3000/category/update/${id}`, { name });
  }
  deleteCategory(id: string) {
    return this.http.delete(`http://localhost:3000/category/delete/${id}`);
  }

}
