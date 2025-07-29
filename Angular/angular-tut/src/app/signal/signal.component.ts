import {Component, effect, signal} from '@angular/core';

@Component({
  selector: 'app-signal',
  imports: [],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.css'
})
export class SignalComponent {
  count = signal(10);
  name = signal('Angular Tut');
  x = 20;

  constructor() {
    effect(() => {
      // console.log("X" , this.x)
      console.log("count", this.count())
    });
  }

  // updateValue(){
  //   this.x = 30;
  //   // this.count.set(100);
  //   this.count.set(this.count()+1);
  //
  // }
  // increment(){
  //   this.count.set(this.count()+1);
  // }
  // decrement(){
  //   this.count.set(this.count()-1);
  // }
  updateValue(val: string) {
    if (val == 'inc') {
      this.count.set(this.count() + 1);
    } else {
      this.count.set(this.count() - 1);
    }
  }

}
