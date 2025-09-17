import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgForOf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  categoryService = inject(CategoryService);
  categoryList: any[] = [];

  ngOnInit() {
    this.categoryService.getCategories().subscribe((result: any) => {
      console.log("API Response:", result);

      this.categoryList = result.allCategories || result || [];

      console.log("categoryList:", this.categoryList);
    });
  }
}
