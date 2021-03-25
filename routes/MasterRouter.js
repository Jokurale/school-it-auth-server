// This files will be used for gathering all new routes in one place
// Predefined routes only

const express = require("express");

const router = express.Router();

// ** All needed routes

const IndexRoute = require("./IndexRoute");
const LoginRoute = require("./LoginRoute");
const LogoutRoute = require("./LogoutRoute");
const RefreshRoute = require("./RefreshRoute");

// ** End of all needed routes

// ! Route setup
router.use([LoginRoute, IndexRoute, LogoutRoute, RefreshRoute]);

module.exports = router;
