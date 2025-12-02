import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  //Sending Data to the DB
  try {
    const result = await userServices.createUser(name, email);
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
};

export const userControllers = {
  createUser,
};
