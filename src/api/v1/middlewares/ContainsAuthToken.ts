import { Request, Response, NextFunction } from "express";

import { TOKEN_MISSING } from "../../../config/constants";
import { ErrorHelper } from "../helpers";

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
