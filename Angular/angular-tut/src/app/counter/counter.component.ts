import {Component} from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  res = 0;
  // increment() {
  //   this.res++;
  //   console.log("counter increment" + this.res);
  // }
  //
  // decrement() {
  //   this.res--;
  //   console.log("counter decrement" + this.res);
  // }
  //
  // reset() {
  //   this.res = 0;
  //   console.log("counter reset" + this.res);
  // }
  handelCount(val:String) {
    if(val=='minus'){
      if(this.res>0) {
      this.res--;
      }
    }
    else if (val=='reset'){
      this.res = 0;
    }
    else {
      this.res++;
    }
  }
}
