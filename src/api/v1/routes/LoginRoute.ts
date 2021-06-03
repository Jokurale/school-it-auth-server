// *** Boilercode

import {
  ContainsPassAndLogin,
  PasswordIsValid,
  UserExists,
} from "../middlewares";

import { TokenController } from "../controllers";
import express from "express";

const route = express.Router();

route.post(
  "/login",
  [
    /* Request */ ContainsPassAndLogin,
    /* and */ UserExists,
    /* and user's */ PasswordIsValid,
  ],
  TokenController.login
);

export default route;
