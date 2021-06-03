import { NextFunction, Request, Response } from "express";

import { ErrorHelper } from "../helpers";
import { USER_DOES_NOT_EXISTS } from "../../../config/constants";
import { UserHelper } from "../helpers";

const UserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { login } = req.body;

  if (await UserHelper.userExists(login)) next();
  else ErrorHelper(res, USER_DOES_NOT_EXISTS);
};

export default UserExists;
