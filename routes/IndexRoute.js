// *** Boilercode
const express = require("express");
const route = express.Router();

// *** Index route
route.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send({ message: "Service is up and running." });
});

module.exports = route;
