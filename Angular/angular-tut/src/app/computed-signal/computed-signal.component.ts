import {Component, computed, signal} from '@angular/core';

@Component({
  selector: 'app-computed-signal',
  imports: [],
  templateUrl: './computed-signal.component.html',
  styleUrl: './computed-signal.component.css'
})
export class ComputedSignalComponent {
x = signal(10);
y = signal(20);
z= computed(()=>this.x()+this.y());

showVal(){
  console.log(this.z());
  this.x.set(100)
  console.log(this.z());
}
updateX(){
  this.x.set(2080)
}

}
