import express, { Request, Response } from "express";

import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/", userControllers.createUser);

//getting all the user data
router.get("/", userControllers.getUser);

//getting single user through id
router.get("/", userControllers.getSingleUser);

//PUT Method
router.put("/", userControllers.updateUser);

//Delete Method
router.delete("/", userControllers.deleteUser);

export const userRoutes = router;
