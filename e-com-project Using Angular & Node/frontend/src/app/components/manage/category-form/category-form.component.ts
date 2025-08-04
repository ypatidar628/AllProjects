import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CategoryService} from '../../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  name: string = "";
  categoryService = inject(CategoryService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  isEdit = false;
  id!: string;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe((result: any) => {
        console.log(result.result);
        this.name = result.result.name;
      })
    }
  }

  addCategory() {
    console.log(this.name); // debug

    const data = {name: this.name}; // ✅ Wrap string in object
    this.categoryService.addCategory(data).subscribe({
      next: (result: any) => {
        this.router.navigate(['admin/categories']);
        console.log("result", result);
        this.name = ""; // Reset input
      },
      error: (err) => {
        console.error("Error adding category:", err);
      }
    });
  }

  updateCategory() {
    console.log("Updating category:", this.id, this.name);

    this.categoryService.updateCategory(this.id, this.name).subscribe({
      next: (result: any) => {
        this.router.navigate(['admin/categories']);
        console.log("Result:", result);
      },
      error: (err) => {
        console.error("Error updating category:", err);
        alert("Something went wrong while updating.");
      }
    });


  }


}
