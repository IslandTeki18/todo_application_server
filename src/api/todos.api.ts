import express from "express";
const router = express.Router();

// Imports
import { createTodo, getTodoById } from "../services/todos.services";

// Needs Auth Middleware
router.post("/", createTodo);
router.get("/:id", getTodoById)

export { router };
