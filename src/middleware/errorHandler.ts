import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.message);
  if (err.message.includes("API key")) {
    return res.status(500).send(err.message);
  }
  if (err.message.includes("Query")) {
    return res.status(400).send(err.message);
  }
  return res.status(500).send("Internal Server Error");
}

export default errorHandler;
