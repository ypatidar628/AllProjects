import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import{inject} from '@angular/core';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-category-form',
  imports: [FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
name : String = "";
categoryService = inject(CategoryService);

  addCategory(){
    console.log(this.name)
    // let data = this.name;
    this.categoryService.addCategory({name:this.name}).subscribe((result:any)=>{
      alert(
        'Category added successfully.',
      )
      console.log("result", result);
    })
    this.name = ""
  }
}
