const input = document.querySelector("#todo-input");
const button = document.querySelector("#add-todo-btn");
const output = document.querySelector("#todo-list");

//needed text to be added to the list from the input field

button.addEventListener("click", addItem());

function addItem() {

    const todoText = input.value;



    output.appendChild(li);

    input.value = ""; // Clear the input field after adding the todo item


}