// *** Boilercode
const express = require("express");
const route = express.Router();

// *** Potential error handling
const { UNPROCESSABLE_TOKEN } = require("../tools/Error.messages");
const PrettyError = require("../tools/Errors.tools");

// *** Importing all the required route-guards
const ContainsAuthToken = require("../guards/ContainsAuthToken");

// *** Importing Token manager
const { refresh, verify } = require("../tools/Token.tools");

// *** Importing running configuration
require("dotenv").config({ path: "../.env" });

route.post("/refresh", [/* Request */ ContainsAuthToken], async (req, res) => {
  const token = req.token;

  const result = await verify(token);

  if (result && "payload" in result) {
    const tokenResult = await refresh(result.payload.login);

    if (tokenResult) res.json(tokenResult);
  } else PrettyError(res, UNPROCESSABLE_TOKEN);
});

module.exports = route;
