import express, { Request, Response } from "express";

import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/", userControllers.createUser);

//getting all the user data
router.get("/", async (req: Request, res: Response) => {
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
router.get("/", async (req: Request, res: Response) => {
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
router.put("/", async (req: Request, res: Response) => {
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
router.delete("/", async (req: Request, res: Response) => {
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

export const userRoutes = router;
