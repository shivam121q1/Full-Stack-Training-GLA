const express = require("express");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 3000;

const dbConnect = require("./config/dbConnect");

const authRoutes = require("./routes/auth.router.js");
const blogRoutes = require("./routes/blog.router.js")


dbConnect();
app.use(express.json());



app.use("/api/v1", authRoutes);
app.use("/api/v1", blogRoutes);

app.get("/", (request, response) => {
    response.send("<h1>Wecome to the Blog Backend</h1>")
})


app.listen(PORT, () => {
    console.log(`Server has started at port ${PORT}`)
})

