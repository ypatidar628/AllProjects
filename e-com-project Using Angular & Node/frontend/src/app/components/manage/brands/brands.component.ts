import { Component, inject, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Category } from '../../../types/category';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-brands',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Category> = new MatTableDataSource([] as any);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  allData = []
  brandService = inject(BrandService);

  ngOnInit() {
    this.loadBrands();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ✅ Centralized loader
  loadBrands() {
    this.brandService.getBrands().subscribe({
      next: (result: any) => {
        if (result.allBrand){
        this.allData = result.allBrand;
        console.log("Brands fetched:", result);
        this.dataSource.data = result.allBrand || [];
        }
      },
      error: (err) => {
        // console.log("Error loading brands:", err);
        this.dataSource.data = []; // fallback
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBrand(id: string) {
    if (confirm("Are you sure you want to delete this brand?")) {
      this.brandService.deleteBrand(id).subscribe({
        next: () => {
          this.loadBrands();
        },
        error: (err) => {
          console.error("Error deleting brand:", err);
          alert("Something went wrong while deleting.");
        }
      });
    }
  }
}
