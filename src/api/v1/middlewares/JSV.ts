import { Request, Response, NextFunction } from "express";
import { JSON_INVALID } from "../../../config/constants";
import { ErrorHelper } from "../helpers";

// *** This middleware ensures that invalid JSON requst won't crash whole app

const JSV = (
  err: StatusError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof SyntaxError && err.status == 400 && "body" in err) {
    ErrorHelper(res, JSON_INVALID);
  }

  next();
};

export default JSV;
