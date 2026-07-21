//create the folder 
//move into the folder (open in vs (IDE))
//npm init -y  to make base for installing packages
//make a file like script.js
//install epress
//create a app
//intialise the server or start 

const express = require("express");

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json()); //middleware


app.listen(3005, () => {
    try {
        console.log("server has started at port 3005")
    } catch (error) {
        console.log(error)
    }

})

//route 
app.get("/", (request, response) => {
    response.send("Hello ji");
});

app.get("/data", (request, response) => {
    response.send("<h1>Hello SHivam</h1>");
});

app.post("/user", (request, response) => {

    const { name, rollNo } = request.body; //destructing 

    console.log("Name is", name);
    console.log("Roll no is", rollNo);

    //function to store in the db

    response.send("Data Recieved");

})


//mongoose ODM 
//install mongooose
//require to use
//connect and connect is promise put the chaiing 
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mydata").then(() => {
    console.log("DB connected successfully")
}).catch((error) => {
    console.log(error);
    console.log("DB not connected")
})



