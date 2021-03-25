// *** Boilercode
const express = require("express");
const route = express.Router();

// *** Potential error handling
const { LOGOUT_FAILED } = require("../tools/Error.messages");
const PrettyError = require("../tools/Errors.tools");

// *** Importing all the required route-guards
const ContainsAuthToken = require("../guards/ContainsAuthToken");

// *** Importing Token manager
const { revoke } = require("../tools/Token.tools");

// *** Importing running configuration
require("dotenv").config({ path: "../.env" });

route.post("/logout", [/* Request */ ContainsAuthToken], async (req, res) => {
  const token = req.token;

  const result = await revoke(token);

  if (result.deletedCount > 0)
    res.json({ message: "Successfully logged out." });
  else PrettyError(res, LOGOUT_FAILED);
});

module.exports = route;
