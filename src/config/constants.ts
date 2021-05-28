import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// Default code
const code = 400;

export const USER_DOES_NOT_EXISTS = {
  message: "User does not exists.",
  code,
};

export const PASSWORD_INVALID = { message: "Password is invalid.", code };

export const MISSING_PARAM = {
  message: "Some parameters are missing.",
  code,
};

export const TOKEN_MISSING = {
  message: "Token is missing, supply request with proper auth header.",
  code,
};

export const UNPROCESSABLE_TOKEN = {
  message: "Server could not process your token.",
  code: 422,
};

export const JSON_INVALID = {
  message: "Unproccessable JSON. Syntax Error",
  code: 422,
};

export const TOKEN_AUDIENCE = "sdly-school-it-resource-server";
export const TOKEN_ISSUER = "sdly-school-it-auth-server";

export const PASSWORD_SALT = process.env.PASS_SALT;

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH;

export const JWT_ACCESS_EXPIRY_TIME = process.env.JWT_ACCESS_EXPIRY;
export const JWT_REFRESH_EXPIRY_TIME = process.env.JWT_REFRESH_EXPIRY;

export const JWT_REFRESH_EXPIRY_NO_UNIT =
  process.env.JWT_REFRESH_EXPIRY_NO_UNIT;

export const RESOURCE_SERVER_PORT = process.env.RESOURCE_SERVER_PORT;
export const RESOURCE_SERVER_URL = process.env.RESOURCE_SERVER_URL;
