import * as dotenv from "dotenv";

import express, { NextFunction, Request, Response } from "express";

import { JSV } from "./api/v1/middlewares";
import MasterRouter from "./api/v1/routes";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// *** .ENV
dotenv.config();

// *** App instance
const app = express();

// *** CORS
app.use(cors());

// *** Request-limiter config
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 1000,
});

// *** Middleware
app.use(express.json());
app.use(helmet());
app.use(limiter);

if (process.env.NODE_ENV !== "testing") app.use(morgan("dev"));

// *** Invalid JSON prevention
app.use(JSV);

// *** Routes
app.use(MasterRouter);

// *** 404
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not found");
  res.status(404);
  next(error);
});

// *** Error resolver
app.use((error: StatusError, req: Request, res: Response) => {
  res.status(error.status || 500);

  res.json({
    error: error.message,
  });
});

// *** Launch
app.listen(process.env.DEV_PORT || 5000, () => {
  if (process.env.NODE_ENV !== "testing")
    console.log(
      `[Auth Service] Auth service is up and running on port ${
        process.env.DEV_PORT || 5000
      }.` as const
    );
});

// Testing purposes
export { app };
