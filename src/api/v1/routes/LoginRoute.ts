// *** Boilercode
import express from "express";
const route = express.Router();

// *** Import all the required route-guards
import {
  ContainsPassAndLogin,
  UserExists,
  PasswordIsValid,
} from "../middlewares";

// *** Import controller
import { TokenController } from "../controllers";

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
