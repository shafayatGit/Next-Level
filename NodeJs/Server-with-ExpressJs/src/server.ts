import { todoController } from './modules/todo/todo.controller';
import config from "./config";
import express, { Request, Response } from "express";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todosRoutes } from "./modules/todo/todo.routes";
const app = express();

//!Parser Or Middleware
app.use(express.json()); //eta hocche json data perser.. eta chara data parse kora jabena json e
//app.use(express.urlencoded()); //eta diye formData parse korte parbo

//! Initializing DB
initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World!");
});

//?Users CRUD --> ekhane use diye kaaj korte hobe ar route theke direct get,post,put,patch,delete use korte hobe
app.use("/users", userRoutes);

//getting all the user data
app.use("/users", userRoutes);

//getting single user through id
app.use("/users", userRoutes);

//PUT Method
app.use("/users", userRoutes);

//Delete Method
app.delete("/users", userRoutes);

//?Todos CRUD
//Post method
app.use("/todos", todosRoutes);

//Getting all the TODOS
app.use("/todos",todosRoutes);

//getting single todo
app.use("/todos", todosRoutes);







//Not Found Route --> 404
app.use((req, res) => {
  //we will be using app.use for not found route
  res.status(404).json({
    success: false,
    message: "Route not found!",
    path: req.path,
  });
});

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
