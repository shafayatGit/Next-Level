import path from "path";
import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
const app = express();
const port = 8000;

//joining path with .env
dotenv.config({ path: path.join(process.cwd(), ".env") });
const pool = new Pool({
  connectionString: `${process.env.Connection_String}`,
});
//!Parser Or Middleware
app.use(express.json()); //eta hocche json data perser.. eta chara data parse kora jabena json e
//app.use(express.urlencoded()); //eta diye formData parse korte parbo

//DB
const initDB = async () => {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      age INT, 
      phone VARCHAR(15),
      address TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )`);
};
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body); //server er console eta

  res.status(200).json({
    message: "Post Method",
    success: true,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
