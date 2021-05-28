import { Request, Response } from "express";

const index = (req: Request, res: Response) => {
  res.header("Content-Type", "application/json");
  res.send({ message: "Service is up and running." });
};

export default { index };
