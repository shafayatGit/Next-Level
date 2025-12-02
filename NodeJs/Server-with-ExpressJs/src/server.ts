import config from "./config";
import express, { Request, Response } from "express";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
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
app.use("/users/:id", userRoutes);

//PUT Method
app.use("/users/:id", userRoutes);

//Delete Method
app.delete("/users/:id", userRoutes);

//?Todos CRUD
//Post method
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos (user_id,title) VALUES($1,$2) RETURNING *`,
      [user_id, title]
    );

    res.status(200).json({
      success: true,
      message: "Posted Todo Successfully",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Down",
    });
  }
});

//Getting all the TODOS
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(200).json({
      success: true,
      message: "Successfully Getting the DATA",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Down",
    });
  }
});

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
