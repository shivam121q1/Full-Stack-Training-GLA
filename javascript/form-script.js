// const form = document.querySelector('form');

// const handleSubmit = () => {

//     const name = document.querySelector('#name').value;
//     const email = document.querySelector('#email').value;
//     const password = document.querySelector('#password').value;
//     const error = document.querySelector('#errortext');

//     error.style.color = 'red';

//     if (name === '' || email === '' || password === '') {
//         error.textContent = 'Please fill in all fields';
//         return;
//     }

//     console.log('Name:', name);
//     console.log('Email:', email);
//     console.log('Password:', password)

//     if (password.length < 6) {
//         // console.log('');
//         error.textContent = "Password is too short "
//         return;
//     }



//     if (password !== "Shivam@123") {
//         error.textContent = "Password is too short "
//         return;

//     }

//     const userData = {
//         name: name,
//         email: email,
//         password: password
//     };

//     localStorage.setItem('userData', JSON.stringify(userData));

//     alert('Form submitted successfully or You are logged in successfully');

//     // name = "";
//     // email = ""
//     // password = ""


// }
// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     // It is used to prevent the default form submission behavior, which would cause the page to reload.Instead, we want to handle the form submission with our custom logic defined in the handleSubmit function.
//     handleSubmit();

// })


//Scope

// Scope determines where a variable can be accesed in a program

// Global
// funciton and block

// const name = "Shivam"

// function greet() {
//     console.log(name);
// }

// greet();
// console.log(name);


//function

// function greet1() {
//     const meessage = "Hello";
//     console.log(message);
// }

// greet();

// console.log(message);

//block scope

// {
//     let age = 20;
//     console.log(age);
// }

// console.log(age);


//Hoisting

// greet();

// function greet() {
//     console.log("Hoisting practice")
// }

// console.log(a);

// var a = 10;


// var a;

// console.log(a);

// a = 10;

// console.log(a);

// console.log(age);

// let age = 20;

// Temporal Dead zone

// time between creation and intialation 

// console.log(city);

// const city = 20;

function outer() {

    let name = "Shivam"

    function inner() {
        console.log(name);
    }

    return inner;

}
//outer 
//inner then use name 
// const innerFunction = outer();
// console.log(innerFunction);
// innerFunction();

// outer();


//high order function

//try catch

// fetch asycn and promise

// High order function is a function

// either

// accepts another function as an argument

// return another function


// function greet(name) {
//     console.log("Hello greet" + name);
// }

// function greet1(name){
//     console.log("Hello greet1 " + name);


// }

// function processUser(callback) {
//     callback("Shivam");
// } //High order function

// processUser(greet);
// processUser(greet1);


// processUser(greet)

// callback = greet

// callback("shivam")

// greet(shivam

// )

// Hello shivam


// anonymus function

// function processUser(callback) {

// conosle.loG("p")
//     callback();
// } //High order function


// processUser(function(){
//     console.log("Addition done");
// })

// returning a function
// function inner() {
//     console.log("high order fucntion");
// }

// function outer() {

//     // let name = "Shivam"



//     return inner;

// }

// const result = outer();

// result();


// forEach

// array1 = [10, 20, 30, 40];


// array1.forEach(function (num) {

//     console.log(num * 2);

// })

// //does not return new array

// ///map -> create new array

// const newArray = array1.map(function (num) {
//     return num * 2;

// })

// console.log(newArray);


// filter


// reduce



// find

// findinde




// array1 = [10, 20, 30, 40];

// reduce is used to reduce an array into single value

// const totalValue = array1.reduce(function (accumulator, currentValue) {
//     return accumulator * currentValue;
// }, 1);

// console.log(totalValue)
// // (function (accumulator, currentValue) {
// //     return accumulator + currentValue;
// // }, initialValue);
//Error Handling


// function withdrawCash(amount, balance) {
//     if (amount > balance) {
//         throw new Error('Insufficient funds in account!');
//     }
//     return balance - amount;
// }

// try {
//     //jisme error anane ki posiblities
//     const balance = withdrawCash(200, 100);
//     console.log(balance);

// } catch (err) {
//     //error come it come in the catch block
//     console.log(err);
//     try {

//         const balance = withdrawCash(20, 100);
//         console.log(balance);
//     } catch (err) {

//     }

// } finally {
//     console.log("balance checked")
// }



// console.log("Start");

// setTimeout(function () {
//     console.log("Task Completed");
// }, 1000);

// console.log("End");


//Callback ??


//

// Callback Hell


// setTimeout(() => {
//     console.log("Boil Water");
//     setTimeout(() => {

//         console.log("Add Tea & sugar")
//         setTimeout(() => {

//             console.log("Add Milk")
//             setTimeout(() => {

//                 console.log("Serve")

//             }, 3000)

//         }, 3000)

//     }, 3000)
// }, 2000)


//Promise

// Promise represent the result of an asynchronous operation that may complete in the future

//pending
//compelete 
//failed

// let promise = new Promise(
//     function (resolve, reject) {

//         setTimeout(() => {
//             let delivered = false;
//             if (delivered) {
//                 resolve("Delivery Successful");
//             } else {
//                 reject("Delivery Failed");
//             }
//         }, 3000)

//     }
// );

// console.log("Work etra start")

// //Asynchronous operation
// promise.then(function (result) {
//     console.log("Success" + result);
// }).catch(function (error) {
//     console.log("Error" + error)
// })

// // async-> sync

// async function paymentStatus() {
//     try {

//         let result = await promise;
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// }

// await paymentStatus();

// //async and await 
// //
// console.log("Work etra doing")
// console.log("Work etra doing")
// console.log("Work etra doing")
// console.log("Work etra doing")
// console.log("Work etra doing")
// console.log("Work end");



//.then()-> runs when the promis is resolved

//.catch()runs when the promise is rejected


//API (Appilcation Programming Interface )
//  bridge that allows two appplication to communicate and echange data 

// fetch(url)
// console.log();
// https://jsonplaceholder.typicode.com/todos/3

// fetch("https://jsonplaceholder.typicode.com/todos/3").then(

//     function (response) {
//         console.log(response);
//         return response.json();

//         //status
//         // header

//     }


// ).then(function (data) {
//     console.log(data);
// }).catch(
//     function (error) {

//         console.log(error);

//     }
// )

async function fetchData() {
    try {
        const result =  await fetch("https://jsonplaceholder.typicode.com/todos/3");
        console.log(result);
        const data =  await result.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

fetchData();
