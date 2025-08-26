// let a = 12 ;
// let b ="13";
// console.log(a+b);
// console.log(typeof(a+b));

// let a = 10; //static variable

// get value from user side and type casting 
// let age = prompt("What is your age : ")
// age = Number(age) //Type casting 
// console.log(typeof(age));


// swap 2 variable via 3 methods

// M-1.
// let a = 10;
// let b = 20;
// let c;

// c = a ; // c=10
// a = b ; // a=20
// b = c ; // b=10

// console.log("a " , a);
// console.log("b " , b);

// M-2.

// let a = 373;
// let b = 339;

// a = a + b ;
// b = a - b ;
// a = a - b ;

// console.log("a " , a);
// console.log("b " , b);

// M-3.

// let a = 10 ;
// let b = 20 ;

// [a,b] = [b,a]

// console.log("a " , a);
// console.log("b " , b);

// Increment and Decrement Operatos


// a = 10;
// b = ++a // post increment
// console.log("a " , a); 
// console.log("b " , b); 

// Q1
// let i = 11;
// i = i++ + ++i ;
// console.log(i); // 24

// Q2
// let a = 11;
// let b = 22;
// let c = a + b + a++ + b++ + ++a + ++b;
// console.log("a : ",a);
// console.log("b : ",b);
// console.log("c : ",c);


// Q3
// let a = true ;
// a++;
// console.log(a);

// Q4
// let a = 11++;
// console.log(a);

// Q5
// let i = 11;
// let j = --(i++);
// console.log(j);


// MATH FUNCTION 

// Q - Calculate area and perimeter of rectangle.
// let length = 9 ;
// let breadth = 4 ;
// console.log("Area : "+ length * breadth);
// console.log(`Perimete : ${ 2*( length + breadth ) }`);


// Q - Genrate Otp of 6 digit

// let otp = Math.floor((Math.random()*900000)+100000);
// console.log(`OTP is : ${otp}`);


// Q - Area of triangle by heron's formula // sqrt  of s * (s-a) * (s-b) * (s-c)

// let a = 5 ;
// let b = 4 ;
// let c = 3 ;

// let s =  (a+b+c)/2 ; //s (semiPerameter) = sum of all number's half

// let ans = Math.sqrt( s* (s-a) * (s-b) * (s-c));

// console.log(ans);

// Q - Circumference of circle

let redius = 12 ;
console.log(Number((2*Math.PI*redius).toFixed(2)));
