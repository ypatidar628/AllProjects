import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
    NgForOf,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  dataSource = new MatTableDataSource<any>([]);
  allData: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productService = inject(ProductService);

  thumbnail: string = '';
  idForImage: string = '';

  ngAfterViewInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (result: any) => {
        this.allData = result.result || [];
        this.dataSource = new MatTableDataSource<any>(this.allData);

        // connect paginator & sort
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.dataSource = new MatTableDataSource<any>([]);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get paginatedData() {
    // ✅ use dataSource.filteredData with paginator
    if (!this.dataSource.paginator) return this.dataSource.filteredData;
    const startIndex = this.dataSource.paginator.pageIndex * this.dataSource.paginator.pageSize;
    return this.dataSource.filteredData.slice(startIndex, startIndex + this.dataSource.paginator.pageSize);
  }

  trackByIndex(index: number): number {
    return index;
  }

  getImgAdd(img: string, id: string) {
    if (img.length > 0) {
      this.idForImage = id;
      this.thumbnail = img;
    }
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          alert('Something went wrong while deleting.');
        },
      });
    }
  }
}
