import {Component} from '@angular/core';

@Component({
  selector: 'app-getsetinputvalue',
  imports: [],
  templateUrl: './getsetinputvalue.component.html',
  styleUrl: './getsetinputvalue.component.css'
})
export class GetsetinputvalueComponent {
  name: string = "";
  displayName: string = "";
  email: string = "";
  displayEmail: string = "";

  getName(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.name = val;
  }

  showName() {
    this.displayName = this.name;
  }

  setName() {
    this.name = "Manav"
  }
  getEmail(mail: string) {
    console.log(mail)
    this.email = mail;
    this.displayEmail = this.email;
  }
  setEmail() {
    this.email = "example123@email.com";
  }
}
