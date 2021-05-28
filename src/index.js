// *** Bolier-plate code
const express = require("express");
const app = express();
const cors = require("cors");

// *** Request-limiter import
const rateLimit = require("express-rate-limit");

// *** Any required middleware
const { JSV } = require("./api/v1/middlewares");

// *** .ENV
require("dotenv").config();

// *** CORS
app.options(cors());
app.use(cors());

// *** Request-limiter config
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 1000,
});

// *** Addons
app.use(express.json());
app.use(require("morgan")("dev"));
app.use(require("helmet")());
app.use(limiter);

// *** Invalid JSON prevention
app.use(JSV);

// *** Routes
app.use(require("./api/v1/routes"));

// *** 404
app.use((req, res, next) => {
  const error = new Error("Not found");
  res.status(404);
  next(error);
});

// *** Error resolver
app.use((error, req, res) => {
  res.status(error.status || 500);

  res.json({
    error: error.message,
  });
});

// *** Launch
app.listen(process.env.DEV_PORT || 5000, () => {
  console.log(
    `[Auth Service] Auth service is up and running on port ${
      process.env.DEV_PORT || 5000
    }.`
  );
});
