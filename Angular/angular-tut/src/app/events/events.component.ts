import { Component } from '@angular/core';

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  handelEvent(event:Event) {
    // console.log("Function Called...", event);
    console.log("Function Called...", event.type);
    console.log("value",(event.target as HTMLInputElement).value);
    // console.log("Function Called...", event.target);
  }
}
