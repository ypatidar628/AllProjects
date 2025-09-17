import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

import {ProductService} from '../../../services/product.service';
import {BrandService} from '../../../services/brand.service';
import {CategoryService} from '../../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Brand} from '../../../types/brand';
import {Category} from '../../../types/category';

import toastifier from 'toastifier';
import 'toastifier/dist/toastifier.min.css';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  private productService = inject(ProductService);
  private brandService = inject(BrandService);
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  brands: Brand[] = [];
  categories: Category[] = [];

  productForm = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    description: [null, [Validators.required, Validators.minLength(10)]],
    price: [null, [Validators.required]],
    discount: [null],
    image: this.fb.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
    isFeatured: [false],
    isNew: [false],
  });

  isEdit = false;
  id: string | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;

    // Load categories & brands regardless
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        // support different response shapes
        this.categories = res?.allCategories ?? res;
      },
      error: (err) => console.error('Categories load error', err)
    });

    this.brandService.getBrands().subscribe({
      next: (res: any) => {
        this.brands = res?.allBrand ?? res;
      },
      error: (err) => console.error('Brands load error', err)
    });

    if (id) {
      // EDIT MODE: populate from API (no pre-added empty control)
      this.isEdit = true;
      this.productService.getProductById(id).subscribe({
        next: (res: any) => {
          const product = res?.result ?? res;
          // clear any existing controls and populate
          this.image.clear();
          if (Array.isArray(product?.image) && product.image.length > 0) {
            product.image.forEach((img: string) => this.image.push(this.fb.control(img)));
          } else {
            // API returned no images — provide a single empty input
            this.addImage();
          }

          this.productForm.patchValue({
            name: product?.name ?? null,
            description: product?.description ?? null,
            price: product?.price ?? null,
            discount: product?.discount ?? null,
            categoryId: product?.categoryId ?? null,
            brandId: product?.brandId ?? null,
            isFeatured: !!product?.isFeatured,
            isNew: !!product?.isNew
          });
        },
        error: (err) => {
          console.error('Product load error', err);
          // in case of error still provide a single input so UI is usable
          if (this.image.length === 0) this.addImage();
        }
      });
    } else {
      // ADD MODE: create one empty image input
      this.addImage();
    }
  }

  // convenience getter
  get image(): FormArray {
    return this.productForm.get('image') as FormArray;
  }

  // add a new image control
  addImage(): void {
    this.image.push(this.fb.control(null));
  }

  // remove by index (keeps at least 1 control)
  removeImage(index?: number): void {
    if (this.image.length <= 1) return; // always keep at least one control
    if (typeof index === 'number') {
      if (index >= 0 && index < this.image.length) {
        this.image.removeAt(index);
      }
    } else {
      this.image.removeAt(this.image.length - 1);
    }
  }

  // remove blank/null images before sending
  private cleanFormValue() {
    const raw = this.productForm.getRawValue();
    const imgs = Array.isArray(raw.image) ? raw.image : [];
    const filtered = imgs
      .map((i: any) => (typeof i === 'string' ? i.trim() : i))
      .filter((i: any) => i && i !== 'null');
    return {
      ...raw,
      image: filtered
    };
  }

  // Add new product
  addProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      toastifier('❌ Form invalid, please fill required fields.', {type: 'warning'});
      return;
    }

    const payload = this.cleanFormValue();

    this.productService.addProduct(payload).subscribe({
      next: (res: any) => {
        toastifier('✅ Product Added Successfully!', {type: 'success', autoClose: 3000, position: 'top-right'});
        this.productForm.reset();
        // Reset image array to 1 empty control for next add
        this.image.clear();
        this.addImage();
        this.router.navigate(['/admin/product']);
      },
      error: (err) => {
        console.error('Add product error', err);
        toastifier('❌ Something went wrong. Try again.', {type: 'error', autoClose: 3000, position: 'top-right'});
      }
    });
  }

  // Update existing product
  updateProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      toastifier('❌ Form invalid, please fill required fields.', {type: 'warning'});
      return;
    }

    if (!this.id) {
      toastifier('❌ Missing product id for update.', {type: 'error'});
      return;
    }

    const payload = this.cleanFormValue();

    this.productService.updateProduct(this.id, payload).subscribe({
      next: (res: any) => {
        toastifier('✅ Product Updated Successfully!', {type: 'success', autoClose: 3000, position: 'top-right'});
        this.productForm.reset();
        this.image.clear();
        // after update, leave a single empty input (or navigate away)
        this.addImage();
        this.router.navigate(['/admin/product']);
      },
      error: (err) => {
        console.error('Update product error', err);
        toastifier('❌ Something went wrong. Try again.', {type: 'error', autoClose: 3000, position: 'top-right'});
      }
    });
  }

  // called by the form submit (enter or submit button)
  onSubmit(): void {
    if (this.isEdit) this.updateProduct();
    else this.addProduct();
  }
}
