import { Request, Response } from "express";
import { userServices } from "./user.service";

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

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
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
};

const getSingleUser = async (req: Request, res: Response) => {
  //console.log(req.params.id) --> getting the id
  try {
    const result = await userServices.getSingleUser(req.params.id);

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
};

const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  //console.log(req.params.id);

  try {
    const result = await userServices.updateUser(name, email, req.params.id);

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
};

const deleteUser = async (req: Request, res: Response) => {
  //console.log(req.params.id) --> getting the id
  try {
    const result = await userServices.deleteUser(req.params.id);

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
};

export const userControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
