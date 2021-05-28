require("dotenv").config();

// Default code
const code = 400;

const errorMessages = {
  USER_DOES_NOT_EXISTS: {
    message: "User does not exists.",
    code,
  },

  PASSWORD_INVALID: { message: "Password is invalid.", code },

  TOKEN_ALREADY_ISSUED: {
    message: "Token has already been issued.",
    code,
  },

  MISSING_PARAM: {
    message: "Some parameters are missing.",
    code,
  },

  TOKEN_MISSING: {
    message: "Token is missing, supply request with proper auth header.",
    code,
  },

  LOGOUT_FAILED: {
    message: "Server couldn't log you out.",
    code,
  },

  UNPROCESSABLE_TOKEN: {
    message: "Server could not process your token.",
    code: 422,
  },

  JSON_INVALID: {
    message: "Unproccessable JSON. Syntax Error",
    code: 422,
  },
};

const constants = {
  TOKEN_AUDIENCE: "sdly-school-it-resource-server",
  TOKEN_ISSUER: "sdly-school-it-auth-server",
  PASSWORD_SALT: process.env.PASS_SALT,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH,

  JWT_ACCESS_EXPIRY_TIME: process.env.JWT_ACCESS_EXPIRY,
  JWT_REFRESH_EXPIRY_TIME: process.env.JWT_REFRESH_EXPIRY,

  JWT_REFRESH_EXPIRY_NO_UNIT: process.env.JWT_REFRESH_EXPIRY_NO_UNIT,

  RESOURCE_SERVER_PORT: process.env.RESOURCE_SERVER_PORT,
  RESOURCE_SERVER_URL: process.env.RESOURCE_SERVER_URL,

  ...errorMessages,
};

module.exports = Object.freeze(constants);
