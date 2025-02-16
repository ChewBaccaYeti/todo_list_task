const fs = require("fs");
const path = require("path");
const dataFilePath = path.join(__dirname, "../api/data.json");

const readData = () => {
    try {
        const data = fs.readFileSync(dataFilePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

// record init
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
};

// GET
const getTodos = (req, res) => {
    const todos = readData();
    res.json(todos);
};

// GET by ID
const getTodoById = (req, res) => {
    const todos = readData();

    console.log("typeof req.params.id:", typeof req.params.id);
    console.log("typeof todos[0].id:", typeof todos[0]?.id);

    const todo = todos.find((todo) => todo.id === Number(req.params.id));

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
};


// POST
const createTodo = (req, res) => {
    const todos = readData();
    const newTodo = {
        id: Date.now(), // Unique ID, set to current timestamp of UNIX epoch, so I am sure there will be no duplicates
        title: req.body.title,
        completed: false,
    };

    todos.push(newTodo);
    writeData(todos);
    res.status(201).json(newTodo);
};

// PUT
const updateTodo = (req, res) => {
    const todos = readData();
    const todoIndex = todos.findIndex((todo) => todo.id === Number(req.params.id));

    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo not found" });
    }

    todos[todoIndex] = { ...todos[todoIndex], ...req.body };
    writeData(todos);
    res.json(todos[todoIndex]);
};

// Well, I guess I don't need to explain this one
const deleteTodo = (req, res) => {
    let todos = readData();

    const initialLength = todos.length;
    todos = todos.filter((todo) => todo.id !== Number(req.params.id));

    if (todos.length === initialLength) {
        return res.status(404).json({ message: "Todo not found" });
    }

    writeData(todos);
    res.json({ message: "Todo deleted", id: Number(req.params.id) });
};


module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo
};
