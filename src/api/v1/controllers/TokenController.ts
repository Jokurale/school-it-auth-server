import { Request, Response } from "express";

import { ErrorHelper } from "../helpers";
import { TokenService } from "../services";
import { UNPROCESSABLE_TOKEN } from "../../../config/constants";

const { generateToken, verifyToken, refreshToken } = TokenService;

// Routes and actions
const login = async (req: Request, res: Response): Promise<void> => {
  const { login } = req.body;

  const tokens = await generateToken(login);

  res.json(tokens);
};

const refresh = async (req: Request, res: Response): Promise<void> => {
  const token = req.token;

  const result = verifyToken(token as string);

  if (result && "payload" in result) {
    const tokenResult = await refreshToken(result.payload.login);

    if (tokenResult) res.json(tokenResult);
  } else ErrorHelper(res, UNPROCESSABLE_TOKEN);
};

export default {
  login,
  refresh,
};
