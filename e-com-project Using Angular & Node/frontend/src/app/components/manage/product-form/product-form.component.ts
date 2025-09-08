import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {BrandService} from '../../../services/brand.service';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../../types/category';
import {Brand} from '../../../types/brand';
import toastifier from 'toastifier'
import 'toastifier/dist/toastifier.min.css';


@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatSelectModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  brandService = inject(BrandService);
  categoryService = inject(CategoryService);
  brands: Brand[] = [];
  categories: Category[] = [];

  private formBuilder = inject(FormBuilder);

  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    description: [null, [Validators.required, Validators.minLength(10)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
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
    this.categoryService.getCategories().subscribe((result: any) => {
      // console.log(result.allCategories);
      this.categories = result.allCategories;
    })
    this.brandService.getBrands().subscribe((result: any) => {
      // console.log(result.allBrand);
      this.brands = result.allBrand;
    })
  }

  addProduct() {
    // if (!this.productForm.valid) {
    //   this.productForm.markAllAsTouched();
    //   toastifier("❌ Form invalid, please fill required fields." , { type: "warning" });
    //   console.warn("❌ Form invalid, please fill required fields.");
    //
    //
    //   return;
    // }

    const value = this.productForm.getRawValue();
    // console.log("✅ Submitting product:", value);

    this.productService.addProduct(value).subscribe({
      next: (result: any) => {
        // console.log("✅ API Response:", result);
        if (result.status === 200) {
          toastifier("✅ Brand Added Successfully!", {type: "success", autoClose: 3000, position: "top-right"});
        }
        this.router.navigate(['/admin/product']); // navigate after success
        this.productForm.reset()
      },
      error: (err) => {
        console.error("❌ API Error:", err.error.message);
        console.error("❌ API Error:", err);
        toastifier("Something went wrong, please try again!", {type: "error", autoClose: 3000, position: "top-right"});
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

    this.productService.updateProduct(this.id, value).subscribe({
      next: (result: any) => {
        console.log("✅ API Response:", result);
        if (result.status === 200) {
          toastifier("✅ Product Update Successfully!", {type: "success", autoClose: 3000, position: "top-right"});
        }
        this.router.navigate(['/admin/product']); // navigate after success
        this.productForm.reset()
      },
      error: (err) => {
        console.error("❌ API Error:", err.error.message);
        console.error("❌ API Error:", err);
        toastifier("Something went wrong, please try again!", {type: "error", autoClose: 3000, position: "top-right"});

      }
    })
  }
}
