import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await todoServices.createTodo(user_id, title);
    res.status(200).json({
      success: true,
      message: "Todo Posted",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Down",
    });
  }
};

const getTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodo();

    res.status(200).json({
      success: true,
      message: "Todo Posted",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Down",
    });
  }
};

const getSingleTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getSingleTodo(req.params.user_id);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const result = await todoServices.updateTodo(title, req.params.user_id);
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Down",
    });
  }
};
export const todoController = {
  createTodo,
  getTodo,
  getSingleTodo,
  updateTodo,
};
