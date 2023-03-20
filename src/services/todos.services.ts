import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
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
    console.log(rows[0]);
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
export const getTodoById = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM todos WHERE todo_id = $1",
      [req.params.id]
    );
    if (!rows[0]) {
      return res.status(404).send({ message: "Todo not found." });
    }
    return res.status(200).send(rows[0]);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// DESC:    Get All Todos
// ROUTE:   /todos
// AUTH:    PRIVATE
export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM todos;");
    if (!rows.length)
      return res.status(404).send({ message: "There are no todos." });

    return res.status(200).send(rows);
  } catch (error) {
    return res.status(500).send({ error: error.message }).end();
  }
};

// DESC:    Update a Todo
// ROUTE:   /todo/:id/update
// AUTH:    PRIVATE
export const updateTodoById = async (req: Request, res: Response) => {
  try {
    const todo_id = req.params.id;
    const { title, description, assigned_to, is_complete, completed_on } =
      req.body;
    const { rows } = await pool.query(
      "SELECT * FROM todos WHERE todo_id = $1;",
      [todo_id]
    );
    if (!rows[0]) {
      return res.status(404).send({ message: "Todo not found." });
    }
    await pool.query(
      "UPDATE todos SET title = $1, description = $2, assigned_to = $3, is_complete = $4, completed_on = $5 WHERE todo_id = $6;",
      [
        title ? title : rows[0].title,
        description ? description : rows[0].description,
        assigned_to ? assigned_to : rows[0].assigned_to,
        is_complete ? is_complete : rows[0].is_complete,
        completed_on ? completed_on : rows[0].completed_on,
        todo_id,
      ]
    );
    return res.status(200).json("Todo was updated!");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// DESC:    Delete a Todoc
// ROUTE:   /todo/:id/remove
// AUTH:    PRIVATE
