import {Component, inject, ViewChild} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {Category} from '../../../types/category';
import {BrandService} from '../../../services/brand.service';


@Component({
  selector: 'app-brands',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  brandService = inject(BrandService);

  constructor() {

    this.dataSource = new MatTableDataSource([] as any);
  }
  ngOnInit() {
    this.brandService.getBrands().subscribe((result:any )=>{
      console.log("Result is : " +JSON.stringify(result));
      this.dataSource.data=result.allBrand;
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

  deleteBrand(id: string) {
    if (confirm("Are you sure you want to delete this brand?")) {
      this.brandService.deleteBrand(id).subscribe({
        next: () => {
          // alert("Brand deleted successfully.");
          // this.fetchData();
          this.ngOnInit()
        },
        error: (err) => {
          console.error("Error deleting brand:", err);
          alert("Something went wrong while deleting.");
        }
      });
    }}
}
