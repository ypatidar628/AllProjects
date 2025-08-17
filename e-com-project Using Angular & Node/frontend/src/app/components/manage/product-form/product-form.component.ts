import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, FormsModule , MatInputModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

formBuilder = inject(FormBuilder);
productForm = this.formBuilder.group({
  name: [null , [ Validators.required , Validators.minLength(5)]],
  shotDescription: [null , [ Validators.required , Validators.minLength(10)]],
  description: [null , [ Validators.required , Validators.minLength(50)]],
  price: [null , [ Validators.required ]],
  discount: [],
  images: this.formBuilder.array([]),
  categoryId: [null , [ Validators.required ]],
})
  value :any ='';
  ngOnInit() {
  this.addImage();
  }

  addProduct(){

  this.value = this.productForm.value;
    console.log(this.value)
  // this.productForm.reset();
  }

  addImage(){
  this.images.push(this.formBuilder.control(null));
  }
  removeImage(){
  this.images.removeAt(this.images.length - 1);
  }
  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }
}
