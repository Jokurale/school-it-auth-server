// *** Boilercode
import express from "express";
const route = express.Router();

// Index controller
import { IndexController } from "../controllers";

// *** Index route
route.get("/", IndexController.index);

export default route;
