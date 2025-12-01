import dotenv from "dotenv";
import path from "path";
import express, { Request, Response } from "express";
import { Pool } from "pg";
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
  await pool.query(`
        CREATE TABLE IF NOT EXISTS todos(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT FALSE,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
  )`);
};
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

//?Users CRUD
app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  //Sending Data to the DB
  try {
    const result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1,$2) RETURNING *`,
      [name, email]
    );
    // console.log(result.rows[0]);

    res.status(200).json({
      success: true,
      message: "Posted Successfully",
      data: result.rows[0], //we can see this from our postman.. so no need to go to DB
    });
  } catch (err: any) {
    res.status(201).json({
      succuss: false,
      message: err.message,
    });
  }
});

//getting all the user data
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users
      `);
    console.log(result.rows);

    res.status(200).json({
      success: true,
      message: "Successfully Getting the DATA",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "You cannot enter here!!",
    });
  }
});

//getting single user through id
app.get("/users/:id", async (req: Request, res: Response) => {
  //console.log(req.params.id) --> getting the id
  try {
    const result = await pool.query(
      `
      SELECT * FROM users WHERE id = $1
      `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        status: false,
        message: "Nothing Found",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Data getting from the DB",
        data: result.rows[0],
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "You can't get the data",
    });
  }
});

//PUT Method
app.put("/users/:id", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  //console.log(req.params.id);

  try {
    const result = await pool.query(
      `
      UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *
      `,
      [name, email, req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        status: false,
        message: "Nothing Found",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "User Updated Successfully",
        data: result.rows[0],
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "You can't get the data",
    });
  }
});

//Delete Method
app.delete("/users/:id", async (req: Request, res: Response) => {
  //console.log(req.params.id) --> getting the id
  try {
    const result = await pool.query(
      `
      DELETE FROM users WHERE id = $1
      `,
      [req.params.id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        status: false,
        message: "Nothing Found",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "User Deleted Successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "You can't get the data",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
