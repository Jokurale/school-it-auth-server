// *** Standalone guard

const { MISSING_PARAM } = require("../../../config/constants");
const { ErrorHelper } = require("../helpers/ErrorHelper");

module.exports = (req, res, next) => {
  if (req.body.login && req.body.password) next();
  else ErrorHelper(res, MISSING_PARAM);
};
