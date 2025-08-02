import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
http = inject(HttpClient);
  constructor() { }

  getCategories(){
    return this.http.get("http://localhost:3000/category/view");
  }
  addCategory(name:any){
    return this.http.post("http://localhost:3000/category/add",name);
  }
}
