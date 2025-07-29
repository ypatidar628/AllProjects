import { Component } from '@angular/core';

@Component({
  selector: 'app-if-else-flow',
  imports: [],
  templateUrl: './if-else-flow.component.html',
  styleUrl: './if-else-flow.component.css'
})
export class IfElseFlowComponent {
  display : boolean = true;
  toggelDiv : boolean = true;
  color :any=1;

  hide(){
    this.display=false;
  }
  show(){
    this.display=true;
  }
  toggel(){
    this.display = !this.display;
  }
  toggelTwo(){
    this.toggelDiv = !this.toggelDiv;
  }

  handelColor(val:any){
    this.color=val;
  }
  handelColorByInput(event:Event){
    this.color = (event.target as HTMLInputElement).value;
  }
}
