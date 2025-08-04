import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Brand} from '../types/brand';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  http = inject(HttpClient);

  constructor() { }

  getBrands(){
    return this.http.get<Brand[]>("http://localhost:3000/brand/view");
  }
  getBrandById(id:string){
    return this.http.get<Brand>("http://localhost:3000/brand/"+id);
  }
  addBrand(data: { name: string }) {
    return this.http.post("http://localhost:3000/brand/add", data);
  }
  updateBrand(id: string, name: string) {
    return this.http.put(`http://localhost:3000/brand/update/${id}`, { name });
  }
  deleteBrand(id: string) {
    return this.http.delete(`http://localhost:3000/brand/delete/${id}`);
  }
}
