import { Request, Response, NextFunction } from "express";

import { PasswordHelper } from "../helpers";
import { ErrorHelper } from "../helpers";

import { PASSWORD_INVALID } from "../../../config/constants";

const PasswordIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { login, password } = req.body;

  if (await PasswordHelper.isValid(login, password)) next();
  else ErrorHelper(res, PASSWORD_INVALID);
};

export default PasswordIsValid;
