import { Response } from "express";

const ErrorHelper = (res: Response, { code, message }: ErrorMessage): void => {
  res.status(code).json({ error: message });
  return;
};

export default ErrorHelper;
