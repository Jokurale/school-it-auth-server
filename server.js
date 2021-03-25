// *** Bolier-plate code
const express = require("express");
const app = express();
const cors = require("cors");

// *** Request-limiter import
const rateLimit = require("express-rate-limit");

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
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("body-parser").json());
app.use(require("morgan")("dev"));
app.use(require("helmet")());
app.use(limiter);

// *** Invalid JSON prevention
app.use(require("./tools/JSONValidator.tools.js"));

// *** Routes
app.use(require("./routes/MasterRouter.js"));

// *** 404
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// *** Error resolver
app.use((error, req, res, next) => {
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
