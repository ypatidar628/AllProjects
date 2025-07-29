import { Component } from '@angular/core';

@Component({
  selector: 'app-loops',
  imports: [],
  templateUrl: './loops.component.html',
  styleUrl: './loops.component.css'
})
export class LoopsComponent {
  users = ["Yogendra","Manav","Aayush","Madhav","Saksham"];
  students = [
    {name:"Yogendra", email:"yogendra@gmail.com" , age:20},
    {name:"Manav", email:"manav@gmail.com" , age:20},
    {name:"Aayush", email:"aayush@gmail.com" , age:23},
    {name:"Saksham", email:"saksham@gmail.com" , age:22},
    {name:"Madhav", email:"madhav@gmail.com" , age:19},
  ];
  getName(name:string){
    console.log(name)
  }
}
