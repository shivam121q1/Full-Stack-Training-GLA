const express = require("express");
const todoController = require("../controllers/todo.controller");

const route = express.Router();



route.post("/create-todo", todoController.createTodo)
route.get("/get-todo", todoController.getAllTodo);
route.put("/update-todo/:id", todoController.updateTodo);
route.delete("/delete-todo/:id", todoController.deleteTodo);
route.get("/get-todo/:id", todoController.getById);

module.exports = route;