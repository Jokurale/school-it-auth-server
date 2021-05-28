// *** Boilercode
import express from "express";
const route = express.Router();

// *** Import all the required route-guards
import { ContainsAuthToken } from "../middlewares";

// *** Import controller
import { TokenController } from "../controllers";

route.post(
  "/refresh",
  [/* Request */ ContainsAuthToken],
  TokenController.refresh
);

export default route;
