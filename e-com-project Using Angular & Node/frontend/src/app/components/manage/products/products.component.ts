import {Component, inject, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-products',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  productService = inject(ProductService);

  constructor() {

    this.dataSource = new MatTableDataSource([] as any);
  }
  ngOnInit() {
    this.productService.getProducts().subscribe((result:any )=>{
      console.log("Result is : " +JSON.stringify(result));
      this.dataSource.data=result.result;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
          this.ngOnInit()
        },
        error: (err) => {
          console.error("Error deleting product:", err);
          alert("Something went wrong while deleting.");
        }
      });
    }}
}
