import {Component, inject, NgModule, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatSort, MatSortHeader, MatSortModule} from '@angular/material/sort';
import {RouterLink} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Category} from '../../../types/category';
import {ProductService} from '../../../services/product.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-products',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink , MatCardModule ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  displayedColumns: string[] = ['id', 'image', 'name','description', 'action'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  productService = inject(ProductService);

  allData:any  =[];
  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }


  ngAfterViewInit() {
    this.loadProducts()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (result: any) => {
        this.allData = result.result;
        console.log("Result is : " + JSON.stringify(result));
        this.dataSource.data = result.result || [];

      // console.log("prond"+JSON.stringify(this.allData));

      },
      error: (err) => {
        console.error("Error loading products:", err);
        this.dataSource.data = []; // fallback to empty array
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

  deleteProduct(id: string) {
    if (confirm("Are you sure you want to delete this brand?")) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          // alert("Product deleted successfully.");
          // this.fetchData();
          // this.ngOnInit()
          this.loadProducts()
        },
        error: (err) => {
          console.error("Error deleting product:", err);
          alert("Something went wrong while deleting.");
        }
      });
    }}
}
