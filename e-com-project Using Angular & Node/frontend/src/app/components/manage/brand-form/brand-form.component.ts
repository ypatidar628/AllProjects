import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {BrandService} from '../../../services/brand.service';

@Component({
  selector: 'app-brand-form',
  imports: [FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
  name : string = "";
  brandService = inject(BrandService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  isEdit = false;
  id!: string;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.isEdit = true;
      this.brandService.getBrandById(this.id).subscribe((result:any)=>{
        console.log(result.result);
        this.name = result.result.name;
      })
    }
  }

  addBrand() {
    console.log(this.name); // debug
    const data = { name: this.name }; // ✅ Wrap string in object

    this.brandService.addBrand(data).subscribe({
      next: (result: any) => {
        console.log("result", result);
        this.router.navigate(['admin/brand']);
        this.name = ""; // Reset input
      },
      error: (err) => {
        console.error("Error adding brand:", err);
      }
    });
  }

  updateBrand() {
    console.log("Updating brand:", this.id, this.name);

    this.brandService.updateBrand(this.id, this.name).subscribe({
      next: (result: any) => {
        this.router.navigate(['admin/brand']);
        console.log("Result:", result);
      },
      error: (err) => {
        console.error("Error updating brand:", err);
        alert("Something went wrong while updating.");
      }
    });


  }

}
