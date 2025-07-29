import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-styling',
  imports: [],
  templateUrl: './dynamic-styling.component.html',
  styleUrl: './dynamic-styling.component.css'
})
export class DynamicStylingComponent {
color = "red";
fontSize = "60";
zoom = false;
bigSize = "60px";
smallSize = "30px";

toggleZoom(){
  this.zoom = !this.zoom;
}
}

