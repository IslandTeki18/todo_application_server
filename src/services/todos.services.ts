import { Request, Response } from "express";
import { pool } from "~src/database/database.js";

// DESC:    Create a Todo
// ROUTE:   /
// AUTH:    PRIVATE
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, assigned_to, is_complete } = req.body;
    if (!title || !description) {
      return res.status(400).send({ message: "Values are missing." });
    }
    const { rows } = await pool.query(
      "INSERT INTO todos(title, description, assigned_to, is_complete, created_on) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [title, description, assigned_to, is_complete, Date.now()]
    );
    return res.status(200).send(rows[0]);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// DESC:    Get a Todo
// ROUTE:   /todo/:id
// AUTH:    PRIVATE

// DESC:    Get All Todos
// ROUTE:   /todos
// AUTH:    PRIVATE

// DESC:    Update a Todo
// ROUTE:   /todo/:id/update
// AUTH:    PRIVATE

// DESC:    Delete a Todo
// ROUTE:   /todo/:id/remove
// AUTH:    PRIVATE
