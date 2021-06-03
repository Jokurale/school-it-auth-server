// *** Boilercode

import { IndexController } from "../controllers";
import express from "express";

const route = express.Router();

route.get("/", IndexController.index);

export default route;
