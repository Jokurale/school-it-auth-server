// This files will be used for gathering all new routes in one place
// Predefined routes only

import IndexRoute from "./IndexRoute";
import LoginRoute from "./LoginRoute";
import RefreshRoute from "./RefreshRoute";
import express from "express";

const router = express.Router();

// ! Route setup
router.use([LoginRoute, IndexRoute, RefreshRoute]);

export default router;
