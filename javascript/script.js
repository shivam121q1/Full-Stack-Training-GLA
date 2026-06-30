// Can be redeclare and updated;
//assignment is not impportant for let
// var age

// age = 40;

// console.log("Age is =", age);

//can't be redeclare but can update
//assignment is not impportant for let

// let age;

// console.log("Age is =", age);

// age = 24;

// `console.log("Age is =", age);
// `
// let age = 20;

// age = 40;

// console.log("Age is =", age);

//can't be redeclared and can't be updated
//assignment is important for using the const

// const PI = 3.14;

// const PI = 3.14;

// console.log(PI)


//String

// let fullName = "Shivam Pal"

// fullName = 'Abhishek'

// let age = 20.1542


// let isDone = true;


// let undefinedVariable;

// console.log(undefinedVariable)

// let user = null; // object

// let array1 = [1, 2, 3]; //object 

// let obj1 = {
//     a: 2,
// }  //object


const name = "Rahul";

const age = 12;

console.log("My name is " + name + " My age is " + age); //old ways

console.log(`My name is ${name} My age is ${age}`); //modern ways

const introduction = `My name is ${name} My age is ${age}`;

console.log(introduction)

const abc = `
Line 1 
Line 2
Line 3`

let a = 10;
let b = 20;
console.log(a == b); // true // type
console.log(a === b); //false

console.log(a <= b);

console.log(a != b);
console.log(a !== b);


let c = a + b; //a b and c are operands & + and  =

// +  , - , / , % and ** ;


let d = 21 % 10;

let dividend = 21 / 10;

console.log(dividend);

const ans = 2 ** 30;

console.log(ans);

// = , += ,-= ,*=, /=, %= Assignment operator

e = 20;

e += 20;

// e = e + 20;
console.log(e)

e -= 20;

//e = e-20;
console.log(e)

e *= 5;

console.log(e);

// e = e*5;


// == , === , != , !== , > , < , >= ,<= comparison operator

//&& !  || logical operator


// let citisen = false;

// console.log();


//increment & decreement ++ , --
//post pre
let f = 6;

console.log(++f);
//post
//use &  then increment or decrement;


//pre
//first increment or decrement then use;



console.log(f);


// Ternary Operator

// ? : &  if else;

// condition  ? value1 : value2

let voteAge = 4;

let voteAns = voteAge >= 18 ? "Eligible to Vote " : "Not Eligible to Vote";

console.log(voteAns);

let schoolOfStudent = "Martin Schools"

//camelCase



//Condition

// if , if else and if else if

// if( condition){
//     //statement
// }

// if (schoolOfStudent === "Martin School") {
//     console.log("School student ")
// }


// if(condition){
//     //statement
// }else{
//statement
// }

if (schoolOfStudent === "Martin School") {
    console.log("School student ")
} else {
    console.log("School not student ")
}

// if(condition){
//     //statement
// }else if(conditon) {
//statement
// }else{
//statement
// }



const day = "Monday";


// switch (value) {
//     case value:
//         break;
//     case value:
//         break;

//     default:
// }
let dayName;
switch (day) {
    case "Monday":
        dayName = 1;
        // break;
    case "Tuesday":
        dayName = 2;
        break;
    case "Wednesday":
        dayName = 3;
        break;
    default:
        dayName = 4;
}
console.log(dayName); // 'Tuesday"










