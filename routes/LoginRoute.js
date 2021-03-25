// *** Boilercode
const express = require("express");
const route = express.Router();

// *** Importing all the required route-guards
const ContainsPassAndLogin = require("../guards/ContainsPassAndLogin");
const UserExists = require("../guards/UserExists");
const PasswordIsValid = require("../guards/PasswordIsValid");
const HasNoActiveToken = require("../guards/HasNoActiveToken");

// *** Importing Token manager
const { generate } = require("../tools/Token.tools");

// *** Importing running configuration
require("dotenv").config({ path: "../.env" });

route.post(
  "/login",
  [
    /* Request */ ContainsPassAndLogin,
    /* and */ UserExists,
    /* and user's */ PasswordIsValid,
    /* and user */ HasNoActiveToken,
  ],
  async (req, res) => {
    const { login } = req.body;

    const tokens = await generate(login);
    res.json(tokens);
  }
);

module.exports = route;
