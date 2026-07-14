import { useState } from "react";
import Card from "./components/Card";
import "./App.css"

// const todos = ["i drink water", "I will walk", "I will cook"];
// //add todo
// task ="I will add"
// todos.push(task)

// //delete todo
// todos[inde];

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  console.log("Task:", task);

  function addTodo() {
    if (task === "") {
      return alert("ENter a todo first");
    }

    setTodos([...todos, task]); //Add todo
    //copy from todos add
    //add task
    //todos store

    //new array with previous and new  data
    setTask(""); // Task
  }
  const todo = ["HTML", "CSS"];

  function deleteTodo(index) {

    console.log(todos)
    const updateTodos = todos.filter((item, i) => i !== index);
    console.log(updateTodos)

    setTodos(updateTodos);

    console.log(updateTodos);
  }
  console.log("Todos", todos);
  return (
    <div className="card">
      <h1>To Do application</h1>
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => {
          setTask(e.target.value);
        }}
      ></input>
      <button onClick={addTodo}>Add Todo</button>

      {todos?.map((item, i) => {
        return (
          <h1>
            {item} <button onClick={() => deleteTodo(i)}>delete</button>
          </h1>
        );
      })}
    </div>
  );
}

//React Fragment

export default App;
