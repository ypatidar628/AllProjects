// Loops

// for loop
// Q- fact of n natural Number
// let pr = prompt("Enter a number");

// if (pr === null){
//     console.log("User cancelled the prompt");
// }   
// else{

//     let n = Number(pr);

//     if(isNaN(n)){
//         console.log("Invalid Input");
//     }
//     else{
//         if(n>0){
//             console.log("is Positive");
//             let fact = 0;
//             for(let i=1 ; i<=n; i++){
//                 fact += i;
//             }
//             console.log(`fact of ${n} natural number is ${fact}`);

//         }
//         else{
//             console.log("Number should be positive or more than 0");

//         }
//     }
// }


// Q- Factorial of n natural Number
// let pr = prompt("Enter a number");

// if (pr === null){
//     console.log("User cancelled the prompt");
// }   
// else{

//     let n = Number(pr);

//     if(isNaN(n)){
//         console.log("Invalid Input");
//     }
//     else{
//         if(n>0){
//             console.log("is Positive");
//             let fact = 1;
//             for(let i=1 ; i<=n; i++){
//                 fact *= i;
//             }
//             console.log(`fact of ${n} natural number is ${fact}`);

//         }
//         else{
//             console.log("Number should be positive or more than 0");

//         }
//     }
// }

// let n = Number(prompt("Enter a number"));

// if( n<1 || isNaN(n)) console.log("Invalid Input or Number should be positive or more than 0");
// else{
//     let fact = 1;
//     // while(n>1) fact *= n--;  
//     for(let i = 1 ; i<=n ; i++) fact *= i;
//     console.log(`fact of ${n} natural number is ${fact}`);
// }


// Q- factor of n natural Number
// let n = Number(prompt("Enter a number"));
// if (n<1 || isNaN(n)) console.log("Invalid Input or Number should be positive or more than 0");
// else{
//     for(let i = 1 ; i<=Math.floor(n/2); i++) if(n%i ===0 )console.log(`${i} is a factor of ${n}`);
//     console.log(`${n} is a factor of ${n}`);
// }

// Q - Prime number or not
// let n = Number(prompt("Enter a number"));
// if (n<2 || isNaN(n)) console.log("Invalid Input or Number should be greater than 1");
// else{
//     console.log(isPrime(n) ? `${n} is a Prime number` : `${n} is not a Prime number`);

// let isPrime = true;
// for(let i = 2 ; i<=Math.floor(n/2); i++) if(n%i ===0 ) {isPrime = false; break;}
// if(isPrime) console.log(`${n} is a Prime number`);
// else console.log(`${n} is not a Prime number`);
// }


// way -2
// function isPrime(n){
//     if (n<=1) return false;
//     if (n===2) return true;
//     if (n%2 ===0) return false;

//     for( let i = 3 ; i<=Math.floor(Math.sqrt(n)); i +=2 ) if(n%i ===0 ) return false;
//     return true;
// }

// --Break and Continue--

// for(let i = 1 ; i<=23 ; i++){
//     if(i===5) break; // when i=5 loop will break
//     console.log(i);
// }
// for(let i = 1 ; i<=23 ; i++){
//     if(i===5) continue; // when i=5 loop will skip that iteration
//     console.log(i);
// }


// let ans = prompt("type anything (exit for close)");
// while(ans !== 'exit'){
//  ans = prompt("type anything (exit for close)");
// }


// Q -Sum of Number

// let ans = Number(prompt("Enter a number"));
// while(isNaN(ans) || ans<1) ans = Number(prompt("Invalid Input or Number should be positive or more than 0 \n Enter a number"));
// let sum = 0;
// for(let i = 1 ; i<=ans ; i++) sum += i;
// console.log(`Sum of ${ans} natural number is ${sum}`);


// Q - Sum of digits
// let n = Number(prompt("Enter a number"));

// let sum = 0; 
// while (n > 0){
//     let rem = n%10
//     sum += rem;
//     n = Math.floor(n/10);
// }
// console.log(sum);


// Q - Revers Number
// let n = Number(prompt("Enter a number"));
// let rev = 0;
// while(n>0){
//     let rem = n%10;
//     rev = rev*10 + rem
//     n = Math.floor(n/10);
// } 
// console.log(rev);

// Q - Strong Number

// let n = Number(prompt("Enter a number"));

// let copyN = n ;
// let sum = 0 ;

// while (n>0){
//     let rem = n%10;
//     let fact = 1;
//     for( let i = 1; i <= rem ; i++ ){
//         fact *= i ;
//     }
//     sum += fact;
//     n = Math.floor(n/10);
// }
// if(copyN === sum){
//     console.log("Strong");
// }
// else{
//     console.log("Not Strong");
// }


// Do while

// Q- repeat hello
// do{
//      var text = prompt("Hello (0 to close)");
// }
// while(text !== "0" );

// Q - Guess the number

// let random = Math.floor(Math.random() * 100) + 1;
// let guess = -1;
// while (guess !== random) {
//     guess = Number(prompt("Guess the number between 1 to 100"));

//     if (isNaN(guess) || guess < 1 || guess > 100) {
//         console.log("Invalid Input or Number should be between 1 to 100 , try again");
//         continue;
//     }

//     if (guess > random) {
//         console.log("Too High , try again");
//     }
//     else if (guess < random) {
//         console.log("Too Low , try again");
//     }
//     else {
//         console.log("You Guessed it right , Congrats 🎉", guess);
//     }
// }


// Q - Sasta calculator

let toContinue = false;
let action = prompt("Enter 1 for + , 2 for - , 3 fro * , 4 for / )");
if(action == "1" || action == "2" || action == "3" || action == "4") 
{
let n1 = Number(prompt("Enter first number"));
let n2 = Number(prompt("Enter second number"));

do{
if(isNaN(n1) || isNaN(n2) || n1 === null || n2 === null ){
    console.log("Invalid Input , you should Enter number only");
    break;
}
else{
switch (action) {
    case '1': console.log(`${n1} + ${n2} = ${n1+n2}`); break;
    case '2': console.log(`${n1} - ${n2} = ${n1-n2}`); break;
    case '3': console.log(`${n1} * ${n2} = ${n1*n2}`); break;
    case '4': console.log(`${n1} / ${n2} = ${n1/n2}`); break;
    default: console.log(`Invalid Input , you should Enter 1 for + , 2 for - , 3 for * ,4 for / ) `); break;
}
}
 toContinue = prompt("Do you want to continue ? (y/n)");
    if(toContinue === 'y'){
        action = prompt("Enter 1 for + , 2 for - , 3 fro * ,4 for / )");
        n1 = Number(prompt("Enter first number"));
        n2 = Number(prompt("Enter second number"));
    }
    else{
        toContinue = false;
    }
}

while(toContinue);
}
else console.log("Invalid Input , you should Enter 1 for + , 2 for - , 3 fro * ,4 for / ) ");
