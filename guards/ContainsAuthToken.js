// *** Standalone guard

const { TOKEN_MISSING } = require("../tools/Error.messages");
const PrettyError = require("../tools/Errors.tools");

module.exports = (req, res, next) => {
  if ("authorization" in req.headers) {
    req.token = req.headers.authorization.split(" ")[1];
    next();
  } else {
    PrettyError(res, TOKEN_MISSING);
  }
};
