import { NextFunction, Request, Response } from "express";

import { ErrorHelper } from "../helpers";
import { TOKEN_MISSING } from "../../../config/constants";

const ContainsAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if ("authorization" in req.headers) {
    req.token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    next();
  } else {
    ErrorHelper(res, TOKEN_MISSING);
  }
};

export default ContainsAuthToken;
