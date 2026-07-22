const express = require("express");
const createTodo = require("../controllers/create-todo.controller");

const route = express.Router();



route.post("/create-todo", createTodo)

module.exports = route;