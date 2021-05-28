// *** Boilercode
const express = require("express");
const route = express.Router();

// *** Import all the required route-guards
const ContainsPassAndLogin = require("../middlewares/ContainsPassAndLogin");
const UserExists = require("../middlewares/UserExists");
const PasswordIsValid = require("../middlewares/PasswordIsValid");

// *** Import controller
const TokenController = require("../controllers/TokenController");

route.post(
  "/login",
  [
    /* Request */ ContainsPassAndLogin,
    /* and */ UserExists,
    /* and user's */ PasswordIsValid,
  ],
  TokenController.login
);

module.exports = route;
