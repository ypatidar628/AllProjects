import {Component, computed, signal,Signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-data-type-signal',
  imports: [],
  templateUrl: './data-type-signal.component.html',
  styleUrl: './data-type-signal.component.css'
})
export class DataTypeSignalComponent {
  data  :WritableSignal<string | number> = signal(10);
  count:Signal<number> = computed(()=>1909); //computed signal is immutable.

  updateSignal(){
    this.data.set("Hello")
    // this.data.update((val)=>val+1)  in signal update method is limited use, we can't use update in multiple dataType.
  }
}
