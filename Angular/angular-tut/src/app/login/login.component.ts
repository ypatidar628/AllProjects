import { Component } from '@angular/core';
import {ProfileComponent} from '../profile/profile.component';

@Component({
  selector: 'app-login',
  imports: [ProfileComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
