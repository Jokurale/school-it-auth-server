// *** Standalone guard

const { MISSING_PARAM } = require("../tools/Error.messages");
const PrettyError = require("../tools/Errors.tools");

module.exports = (req, res, next) => {
  if (req.body.login && req.body.password) next();
  else PrettyError(res, MISSING_PARAM);
};
