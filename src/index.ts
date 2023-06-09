import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { router as TodoRoutes } from "./api/todos.api";

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/todos", TodoRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
