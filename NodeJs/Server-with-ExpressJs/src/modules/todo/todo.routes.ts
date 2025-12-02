import { Response } from "express";
import { Request } from "express";
import express from "express";

import { todoController } from "./todo.controller";
import { pool } from "../../config/db";
import { todoServices } from "./todo.service";
const router = express.Router();

router.post("/", todoController.createTodo);

router.get("/", todoController.getTodo);

router.get("/:user_id", todoController.getSingleTodo);

export const todosRoutes = router;
