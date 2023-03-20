import express from "express";
const router = express.Router();

// Imports
import {
  createTodo,
  getTodoById,
  getAllTodos,
  updateTodoById
} from "../services/todos.services";

// Needs Auth Middleware
router.post("/", createTodo).get("/", getAllTodos);
router.get("/:id", getTodoById).put("/:id", updateTodoById);

export { router };
