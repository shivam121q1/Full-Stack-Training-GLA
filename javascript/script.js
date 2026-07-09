// // // Can be redeclare and updated;
// // //assignment is not impportant for let
// // // var age

// // // age = 40;

// // // console.log("Age is =", age);

// // //can't be redeclare but can update
// // //assignment is not impportant for let

// // // let age;

// // // console.log("Age is =", age);

// // // age = 24;

// // // `console.log("Age is =", age);
// // // `
// // // let age = 20;

// // // age = 40;

// // // console.log("Age is =", age);

// // //can't be redeclared and can't be updated
// // //assignment is important for using the const

// // // const PI = 3.14;

// // // const PI = 3.14;

// // // console.log(PI)


// // //String

// // // let fullName = "Shivam Pal"

// // // fullName = 'Abhishek'

// // // let age = 20.1542


// // // let isDone = true;


// // // let undefinedVariable;

// // // console.log(undefinedVariable)

// // // let user = null; // object

// // // let array1 = [1, 2, 3]; //object 

// // // let obj1 = {
// // //     a: 2,
// // // }  //object


// // const name = "Rahul";

// // const age = 12;

// // console.log("My name is " + name + " My age is " + age); //old ways

// // console.log(`My name is ${name} My age is ${age}`); //modern ways

// // const introduction = `My name is ${name} My age is ${age}`;

// // console.log(introduction)

// // const abc = `
// // Line 1 
// // Line 2
// // Line 3`

// // let a = 10;
// // let b = 20;
// // console.log(a == b); // true // type
// // console.log(a === b); //false

// // console.log(a <= b);

// // console.log(a != b);
// // console.log(a !== b);


// // let c = a + b; //a b and c are operands & + and  =

// // // +  , - , / , % and ** ;


// // let d = 21 % 10;

// // let dividend = 21 / 10;

// // console.log(dividend);

// // const ans = 2 ** 30;

// // console.log(ans);

// // // = , += ,-= ,*=, /=, %= Assignment operator

// // e = 20;

// // e += 20;

// // // e = e + 20;
// // console.log(e)

// // e -= 20;

// // //e = e-20;
// // console.log(e)

// // e *= 5;

// // console.log(e);

// // // e = e*5;


// // // == , === , != , !== , > , < , >= ,<= comparison operator

// // //&& !  || logical operator


// // // let citisen = false;

// // // console.log();


// // //increment & decreement ++ , --
// // //post pre
// // let f = 6;

// // console.log(++f);
// // //post
// // //use &  then increment or decrement;


// // //pre
// // //first increment or decrement then use;



// // console.log(f);


// // // Ternary Operator

// // // ? : &  if else;

// // // condition  ? value1 : value2

// // let voteAge = 4;

// // let voteAns = voteAge >= 18 ? "Eligible to Vote " : "Not Eligible to Vote";

// // console.log(voteAns);

// // let schoolOfStudent = "Martin Schools"

// // //camelCase



// // //Condition

// // // if , if else and if else if

// // // if( condition){
// // //     //statement
// // // }

// // // if (schoolOfStudent === "Martin School") {
// // //     console.log("School student ")
// // // }


// // // if(condition){
// // //     //statement
// // // }else{
// // //statement
// // // }

// // if (schoolOfStudent === "Martin School") {
// //     console.log("School student ")
// // } else {
// //     console.log("School not student ")
// // }

// // // if(condition){
// // //     //statement
// // // }else if(conditon) {
// // //statement
// // // }else{
// // //statement
// // // }



// // const day = "Monday";


// // // switch (value) {
// // //     case value:
// // //         break;
// // //     case value:
// // //         break;

// // //     default:
// // // }
// // let dayName;
// // switch (day) {
// //     case "Monday":
// //         dayName = 1;
// //     // break;
// //     case "Tuesday":
// //         dayName = 2;
// //         break;
// //     case "Wednesday":
// //         dayName = 3;
// //         break;
// //     default:
// //         dayName = 4;
// // }
// // console.log(dayName); // 'Tuesday"








// // name = "Abhishek"; //string


// let student = {
//     name: "Shivam", //string
//     age: 20, //number
//     isStudent: true, //boolean
//     marks: [90, 80, 70], //array
//     address: { //object
//         city: "Delhi",
//         state: "Delhi",
//         country: "India"
//     },
//     greet: function () { //function
//         console.log("Hello, I am " + this.name);
//     }
// }


// student.greet(); // call the greet function of the object student



// // // { } curly braces are used to define the object
// // // name age and isStudent are the property key of the object student

// // //property key can be string or number or symbol

// // //property value can be any data type

// // console.log(student.name); // dot notation

// // console.log(student["isStudent"]); // bracket notation

// // student.age = 21; // update the value of age property

// // console.log(student.age);

// // student.class = "12th"; // add new property class to the object student

// // console.log(student.class);

// // console.log(student); // print the whole object student

// // delete student.isStudent; // delete the property isStudent from the object student

// // console.log(student); // print the whole object student after deleting the property isStudent

// // //for in loop is used to iterate over the properties of an object
// // for (let key in student) {
// //     console.log(key, student[key]); // print the property key and value of the object student
// // }


// //Document Object Model (DOM) is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects; that way, programming languages can interact with the page.

// // const heading = document.getElementById("heading");

// // console.log(heading); // print the heading element

// // // heading.innerHTML = "Hello, I am Shivam"; // change the innerHTML of the heading element

// // console.log(heading.innerHTML); // print the innerHTML of the heading element
// // console.log(heading.textContent); // print the textContent of the heading element
// // console.log(heading.innerText); // print the innerText of the heading element

// // //html content
// // //text content print the content of the element without the html tags

// // //innerText print the content of the element.
// // // heading.innerText = "<h2>Hello, I am Shivam</h2>"; // change the innerText of the heading element
// // heading.innerHTML = "<h1>Hello, I am Shivam</h1>"; // change the innerHTML of the heading element
// // console.log(heading); // print the innerHTML of the heading element


// //class 

// // const card = document.getElementsByClassName("card");

// // console.log(card); // print the card elements

// // console.log(document)

// const block = document.getElementById("heading");

// // console.log(block); // print the heading element

// // block.innerHTML = "<h1>Hello, I am Shivam</h1>"; // change the innerHTML of the heading element

// // block.innerText = "<h1>Hello, I am Shivam</h1>"; // change the innerHTML of the heading element
// console.log(block.innerHTML); // print the innerHTML of the heading element


// const card = document.getElementsByClassName("card");

// console.log(card); // print the card elements

// card[2].innerHTML = "<h1>Hello, I am Shivam</h1>"; // change the innerHTML of the first card element

// const h1 = document.getElementsByTagName("h2")

// console.log(h1); // print the h1 elements

// //querySelector and querySelectorAll

// //querySelector is used to select the first element that matches the specified CSS selector(s) in the document.

// //querySelectorAll is used to select all elements that match the specified CSS selector(s) in the document.

// const tag = document.querySelectorAll(".card");

// console.log(tag); // print the h1 elements

// const heading1 = document.querySelector("#heading1")
// // const heading1 = document.getElementById("heading1")

// console.log(heading1); // print the h1 elements

// heading1.style.color = "red"; // change the color of the heading1 element

// heading1.style.fontSize = "50px"; // change the font size of the heading1 element

// heading1.style.border = "2px solid black"; // change the border of the heading1 element 

// const list = document.querySelector("#list");

// console.log(list); // print the list element


// const item = document.createElement("li"); // create a new li element

// item.innerText = "Item 4"; // set the innerText of the li element

// console.log(item); // print the li element

// list.appendChild(item); // append the li element to the list element

// console.log(list); // print the list element after appending the li element


// // const listItems = document.getElementsByTagName("li"); // get all the li elements

// const listItems = document.querySelectorAll("li");
// console.log(listItems); // print the li elements

// listItems[2].remove();

// console.log(list);


const AddButton = document.querySelector("#btn0");
const RemoveButton = document.querySelector("#btn1");

const list = document.querySelector("#list");

let i = 4;

// AddButton.addEventListener("click", function () {


//     const item = document.createElement("li"); // create a new li element

//     item.innerText = `Item ${i++}` // set the innerText of the li element

//     list.appendChild(item); // append the li element to the list element

// })

RemoveButton.addEventListener("click", function () {

    const listItem1 = document.querySelector("li");

    listItem1.style.color = "blue";
});

AddButton.addEventListener('mousehover', (event) => {

    console.log(event.type); // print the button element that was clicked
    console.log('Button was clicked!');
})
