// *** Boilercode
const express = require("express");
const route = express.Router();

// *** Index route
route.get("/", async (req, res) => {
  res.header("Content-Type", "application/json");
  res.send({ message: "Service is up and running." });
});

module.exports = route;
