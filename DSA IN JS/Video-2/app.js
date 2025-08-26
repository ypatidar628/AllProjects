// Q - 1 Eligeble for vote or not 

// let age = Number(prompt("Enter your age : "));

// if(isNaN(age)){
//     console.log("Wrong Input");
// }
// else if(age>==18){
//     console.log("You can vote");
// }
// else{
//     console.log("You can not vote");

// }

// Q - SHOP DISCOUNT

// let price = Number(prompt("Enter the price of the product : "));
// let des = 0 ;

// Way - 1
// if (isNaN(price)) {
//     console.log("Wrong Input");
// }
// else if (price >= 0 && price <= 5000) {
//     console.log("No discount and you have to pay : " + price);
// }
// else if (price >= 5000 && price <= 7000) {
//     console.log(`5 percent discount and you have to pay : ${ price - Math.floor((5 * price) / 100)}`);
// }
// else if (price >= 7000 && price <= 9000) {
//     console.log(`10 percent discount and you have to pay : ${ price - Math.floor((10 * price) / 100)}`);
// }
// else if (price >= 9000) {
//     console.log(`20 percent discount and you have to pay : ${ price - Math.floor((20 * price) / 100)}`);
// }

// Way - 2
// if(isNaN(price)) {
//     console.log("Wrong Input");
// }
// else if (price >= 0 && price <= 5000) {
//     des = 0;
// }
// else if (price >= 5000 && price <= 7000) {
//     des = 5;
// }
// else if (price >= 7000 && price <= 9000) {
//     des = 10;
// }
// else if (price >= 9000) {
//     des = 20;
// }
// console.log(`${des} percent discount and you have to pay : ${ price - Math.floor((des * price) / 100)}`);


// Q - 3 Electicity bill

// let unit = Number(prompt("Enter the unit : "));

// let amount = 0;

// if (isNaN(unit)) {  
//     console.log("Wrong Input");
// }

// if (unit >= 400){
//     amount = (unit - 400) * 13 ;
//     unit = 400 ;
// }

// if (unit <= 400 && unit >=200){
//     amount += (unit - 200) * 8 ;
//     unit = 200 ;
// }

// if (unit <= 200 && unit >= 100){
//     amount += (unit - 100) * 6 ;
//     unit = 100 ;
// }

// amount += unit *4; 

// console.log("Total amount to be paid : " + amount);


// Q - INR Denominations

// let amount = 5001 ;

// if(amount >= 500 ){
//     console.log("Number of 500 notes : " + Math.floor(amount/500));
//     amount = amount % 500 ;
// }
// if (amount >= 200){
//     console.log("Number of 200 notes : " + Math.floor(amount/200));
//     amount = amount % 200 ;
// }
// if (amount >= 100){
//     console.log("Number of 100 notes : " + Math.floor(amount/100));
//     amount = amount % 100 ;
// }
// if (amount >= 50){
//     console.log("Number of 50 notes : " + Math.floor(amount/50));
//     amount = amount % 50 ;
// }
// if (amount >= 20){
//     console.log("Number of 20 notes : " + Math.floor(amount/20));
//     amount = amount % 20 ;
// }
// if (amount >= 10){
//     console.log("Number of 10 notes : " + Math.floor(amount/10));
//     amount = amount % 10 ;
// }
// if (amount >= 5){
//     console.log("Number of 5 notes : " + Math.floor(amount/5));
//     amount = amount % 5 ;
// }
// if (amount >= 2){
//     console.log("Number of 2 notes : " + Math.floor(amount/2));
//     amount = amount % 2 ;
// }
// if (amount === 1 ){
//     console.log("Number of 1 notes : " + amount);
// }



// Ternary Operator

// 122>3 ? console.log("Hey") : console.log("Hii");

// console.log(122>134 ? "Hey" : "Hii");


// Nested Ternary Operator

// let num = 0 ;
// console.log(num>0 ? "Positive" : num<0 ? "Negative" : "Zero");


// Switch Case 
let day = 4;

switch (day) {
    case 1: console.log("Monday");
        break;
    case 2: console.log("Tuesday");
        break;
    default: console.log("Invalid");
}

//fall through condition...
switch (day) {
    case 1: console.log("Monday");

    case 2: console.log("Tuesday");
        break;
    default: console.log("Invalid");
}



switch (day) {
    case 1: console.log("Monday");
        break;
    case 2: console.log("Tuesday");
        break;
    default: console.log("Invalid");
}

// multiple case per same exceution


switch (day) {
    case 1:
    case 2:
    case 3: console.log("Tuesday");
        break;

    case 4:
    case 5:
    case 6: console.log("Wed");
        break;
    default: console.log("Invalid");
}


// conditional check switch case

switch (true) {
    case 18 > 2: console.log('hello');
        break;
    case 13 < 2: console.log("hey");
        break;
    default: console.log("Invalid");


}   

let num = Number((0.1 + 0.2).toFixed(1)); // "0.5" (string) but its convert into string

switch (num) {
    case 0.3: console.log("Hello");
    break;
    case 0.5: console.log("hey");
    break;
    default: console.log("Invalid");
}
