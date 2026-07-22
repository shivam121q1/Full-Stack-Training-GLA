const Todo = require("../models/todo.model");

const createTodo = async (request, response) => {

    try {
        const { title, description } = request.body;

        if (!title || !description) {
            return response.status(400).json({
                success: false,
                message: "Please provide title and description both"
            })
        }
        const todo = new Todo({
            title,
            description
        });
        await todo.save();
        return response.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: todo
        });


    } catch (error) {
        console.log(error);
        return response.status(500).json({
            success: false,
            message: "Failed to create todo",
            data: error,
        })
    }
}

module.exports = createTodo

//200 success
//400 client error
//500 server error
//201 new record created
//429 too many requests
//404 route not found
// 