import { Request, Response, NextFunction } from "express";

import { UserHelper } from "../helpers";
import { ErrorHelper } from "../helpers";

import { USER_DOES_NOT_EXISTS } from "../../../config/constants";

const UserExists = async (req: Request, res: Response, next: NextFunction) => {
  const { login } = req.body;

  if (await UserHelper.userExists(login)) next();
  else ErrorHelper(res, USER_DOES_NOT_EXISTS);
};

export default UserExists;
