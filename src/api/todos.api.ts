import express from "express";
const router = express.Router();

// Imports
import { createTodo } from "../services/todos.services";

// Needs Auth Middleware
router.post("/", createTodo);

export { router };
