const express = require("express");
const { getTodos, getTodoById, createTodo, updateTodo, deleteTodo } = require("../controllers/todoController");

const router = express.Router();

// my routes
router.get("/", getTodos); // get all todos
router.get("/:id", getTodoById); // get a single todo
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
