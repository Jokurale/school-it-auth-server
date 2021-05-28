// This files will be used for gathering all new routes in one place
// Predefined routes only

import express from "express";
const router = express.Router();

// ** All needed routes

import IndexRoute from "./IndexRoute";
import LoginRoute from "./LoginRoute";
import RefreshRoute from "./RefreshRoute";

// ** End of all needed routes

// ! Route setup
router.use([LoginRoute, IndexRoute, RefreshRoute]);

export default router;
