import { NextFunction, Request, Response } from "express";

import { ErrorHelper } from "../helpers";
import { MISSING_PARAM } from "../../../config/constants";

const ContainsPassAndLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.body.login && req.body.password) next();
  else ErrorHelper(res, MISSING_PARAM);
};

export default ContainsPassAndLogin;
