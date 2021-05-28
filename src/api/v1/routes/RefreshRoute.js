// *** Boilercode
const express = require("express");
const route = express.Router();

// *** Import all the required route-guards
const ContainsAuthToken = require("../middlewares/ContainsAuthToken");

// *** Import controller
const TokenController = require("../controllers/TokenController");

route.post(
  "/refresh",
  [/* Request */ ContainsAuthToken],
  TokenController.refresh
);

module.exports = route;
