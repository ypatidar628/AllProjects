import {Component, ViewChild, inject, Inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {CategoryService} from '../../../services/category.service';
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {Category} from '../../../types/category';

@Component({
  selector: 'app-categories',
  standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent  {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  categoryService = inject(CategoryService);

  constructor() {

        this.dataSource = new MatTableDataSource([] as any);
  }
  ngOnInit() {
    this.categoryService.getCategories().subscribe((result:any )=>{
      console.log("Result is : " +JSON.stringify(result));
      this.dataSource.data=result.allCategories;
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

  deleteCategory(id: string) {
    if (confirm("Are you sure you want to delete this category?")) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          // alert("Category deleted successfully.");
          // this.fetchData();
          this.ngOnInit()
        },
        error: (err) => {
          console.error("Error deleting category:", err);
          alert("Something went wrong while deleting.");
        }
      });
    }}
}
