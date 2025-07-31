import { Component, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  searchText: string = '';

  displayedColumns: string[] = ['id', 'name', 'description'];

  categories = CATEGORY_DATA;

  filteredCategories = [...CATEGORY_DATA];

  pageSize = 5;
  currentPage = 0;

  ngAfterViewInit() {
    this.applyFilter();
  }

  applyFilter() {
    const filter = this.searchText.trim().toLowerCase();
    this.filteredCategories = CATEGORY_DATA.filter(c =>
      c.name.toLowerCase().includes(filter)
    );
    this.currentPage = 0;
  }

  get paginatedData() {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredCategories.slice(startIndex, startIndex + this.pageSize);
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}

interface Category {
  id: number;
  name: string;
  description: string;
}

const CATEGORY_DATA: Category[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Category ${i + 1}`,
  description: `This is the description for category ${i + 1}`,
}));

