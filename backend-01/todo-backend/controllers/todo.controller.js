const Todo = require("../models/todo.model");

const updateTodo = async (request, response) => {
    try {
        const id = request.params.id;
        const { title, description, completed } = request.body;

        const todo = await Todo.findByIdAndUpdate(id, {
            title,
            description,
            completed
        }, { new: true });


        if (!todo) {
            return response.status(400).json({
                success: false,
                message: "Todo not found"
            })
        }

        return response.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo
        })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            message: "failed to update todo"
        })
    }

}

const getById = async (request, response) => {
    try {
        const id = request.params.id;
        const todo = await Todo.findById(id);

        if (!todo) {
            return response.status(400).json({
                success: false,
                message: "Todo not found"
            })
        }

        return response.status(200).json({
            success: true,
            message: "Todo fetched successfully",
            data: todo
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            success: false,
            message: "failed to fetch todo"
        })
    }
}


const getAllTodo = async (request, response) => {

    try {
        const todos = await Todo.find();

        return response.status(200).json({
            success: true,
            message: "Todo fetched succesfully",
            data: todos
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            success: false,
            message: "failed to fetch todos"
        })

    }


}

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

const deleteTodo = async (request, response) => {
    try {
        const id = request.params.id;

        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) {
            return response.status(400).json({
                success: false,
                message: "Todo not found"
            })
        }

        return response.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            data: todo
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            success: false,
            message: "failed to delete todo"
        })
    }
}

module.exports = { createTodo, updateTodo, deleteTodo, getAllTodo, getById };