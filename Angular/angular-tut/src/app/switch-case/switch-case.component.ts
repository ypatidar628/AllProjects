import { Component } from '@angular/core';

@Component({
  selector: 'app-switch-case',
  imports: [],
  templateUrl: './switch-case.component.html',
  styleUrl: './switch-case.component.css'
})
export class SwitchCaseComponent {
  color ='green';
  handelColor(val:string){
    this.color = val;
  }
  handelColorByInput(event:Event){
    this.color = (event.target as HTMLInputElement).value
  }
}
