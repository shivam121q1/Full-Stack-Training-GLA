const express = require("express");
const dbConnect = require("./config/dbconnection");

const todoRoutes = require("./routes/todo.routes");

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

dbConnect();



app.use("/api/v1", todoRoutes);



app.get("/", (req, res) => {
    res.send("<h1>Todo Application Backend</h1>");
});

app.listen(3000, () => {
    console.log("Server has been started at 3000 port")
})

