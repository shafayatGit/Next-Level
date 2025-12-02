import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${new Date().toISOString()} , path:${req.path}, method: ${req.method}`
  );
  next(); //that must have to be called because eta na dile porer function kaaj korbena
};
export default logger;
