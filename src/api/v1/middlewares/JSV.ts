import { NextFunction, Request, Response } from "express";

import { ErrorHelper } from "../helpers";
import { JSON_INVALID } from "../../../config/constants";

// *** This middleware ensures that invalid JSON requst won't crash whole app

const JSV = (
  err: StatusError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof SyntaxError && err.status == 400 && "body" in err) {
    return ErrorHelper(res, JSON_INVALID);
  }

  next();
};

export default JSV;
