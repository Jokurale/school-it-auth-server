import { Request, Response, NextFunction } from "express";

import { MISSING_PARAM } from "../../../config/constants";
import { ErrorHelper } from "../helpers";

const ContainsPassAndLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.body.login && req.body.password) next();
  else ErrorHelper(res, MISSING_PARAM);
};

export default ContainsPassAndLogin;
