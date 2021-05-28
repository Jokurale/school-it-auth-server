// *** Boilercode
const express = require("express");
const route = express.Router();

// Index controller
const IndexController = require("../controllers/IndexController");

// *** Index route
route.get("/", IndexController.index);

module.exports = route;
