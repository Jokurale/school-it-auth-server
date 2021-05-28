// *** Standalone guard

const { TOKEN_MISSING } = require("../../../config/constants");
const { ErrorHelper } = require("../helpers/ErrorHelper");

module.exports = (req, res, next) => {
  if ("authorization" in req.headers) {
    req.token = req.headers.authorization.split(" ")[1];
    next();
  } else {
    ErrorHelper(res, TOKEN_MISSING);
  }
};
