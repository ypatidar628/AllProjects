import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-two-way-binding',
  imports: [
    FormsModule
  ],
  templateUrl: './two-way-binding.component.html',
  styleUrl: './two-way-binding.component.css'
})
export class TwoWayBindingComponent {
  name = "";
  // changeName(event : Event){
  //   const val = (event.target as HTMLInputElement).value
  //   this.name = val;
  // }
}
