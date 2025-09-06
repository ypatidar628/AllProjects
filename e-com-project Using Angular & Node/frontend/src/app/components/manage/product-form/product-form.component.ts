import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, FormsModule, MatInputModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private formBuilder = inject(FormBuilder);

  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
  });
  isEdit = false;
  id!: string;

  ngOnInit() {
    this.addImage();
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.productService.getProductById(this.id).subscribe((result: any) => {
        console.log(result.result);
      })
    }
  }

  addProduct() {
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      console.warn("❌ Form invalid, please fill required fields.");

      return;
    }

    const value = this.productForm.getRawValue();
    console.log("✅ Submitting product:", value);

    this.productService.addProduct(value).subscribe({
      next: (result: any) => {
        console.log("✅ API Response:", result);
        alert("Product added successfully!");
      this.router.navigate(['/admin/product']); // navigate after success
        this.productForm.reset()
      },
      error: (err) => {
        console.error("❌ API Error:", err.error.message);
        console.error("❌ API Error:", err);
        alert("Something went wrong, please try again!");
      }
    });
  }

  addImage() {
    this.images.push(this.formBuilder.control(null));
  }

  removeImage() {
    if (this.images.length > 1) {
      this.images.removeAt(this.images.length - 1);
    }
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  updateProduct() {
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      console.warn("❌ Form invalid, please fill required fields.");

      return;
    }
    const value = this.productForm.getRawValue();

    this.productService.updateProduct(this.id , value).subscribe({
      next: (result: any) => {
        console.log("✅ API Response:", result);
        alert("Product update successfully!");
        this.router.navigate(['/admin/product']); // navigate after success
        this.productForm.reset()
      },
      error: (err) => {
        console.error("❌ API Error:", err.error.message);
        console.error("❌ API Error:", err);
        alert("Something went wrong, please try again!");
      }
    })
  }
}
