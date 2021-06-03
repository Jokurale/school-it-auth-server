// *** Boilercode

import { ContainsAuthToken } from "../middlewares";
import { TokenController } from "../controllers";
import express from "express";

const route = express.Router();

route.post(
  "/refresh",
  [/* Request */ ContainsAuthToken],
  TokenController.refresh
);

export default route;
