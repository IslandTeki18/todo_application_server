import { Request, Response } from "express";
import { pool } from "../database/database";

// DESC:    Create a Todo
// ROUTE:   /
// AUTH:    PRIVATE
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, assigned_to } = req.body;
    if (!title || !description) {
      return res.status(400).send({ message: "Values are missing." });
    }
    const { rows } = await pool.query(
      "INSERT INTO todos (title, description, assigned_to, is_complete) VALUES ($1, $2, $3, $4) RETURNING *;",
      [title, description, assigned_to, false]
    );
    console.log(rows[0])
    if (!rows[0]) {
      return res
        .status(400)
        .send({ message: "Something happened. Request failed." });
    }
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
