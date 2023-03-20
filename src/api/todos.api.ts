import express from "express";
const router = express.Router();

// Imports
import {
  createTodo,
  getTodoById,
  getAllTodos,
} from "../services/todos.services";

// Needs Auth Middleware
router.post("/", createTodo).get("/", getAllTodos);
router.get("/:id", getTodoById);

export { router };
