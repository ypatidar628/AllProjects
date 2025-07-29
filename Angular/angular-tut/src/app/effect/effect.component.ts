import {Component, effect, signal} from '@angular/core';

@Component({
  selector: 'app-effect',
  imports: [],
  templateUrl: './effect.component.html',
  styleUrl: './effect.component.css'
})
export class EffectComponent {
userName =signal("Yogendra Patidar");
count = signal(0);
displayHeading = false;
constructor() {
  effect(() => {
    console.log(this.userName());
    console.log(this.count());
  });
}
incCount() {
  this.count.set(this.count()+1);
  if (this.count()==2) {
    this.displayHeading = true;
    setTimeout(()=>{
      this.displayHeading = false;
    },2000)
  }
  else {
    this.displayHeading = false;
  }
}
toggle(){
  this.displayHeading = !this.displayHeading;
}
}
