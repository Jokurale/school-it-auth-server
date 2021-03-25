// *** Guard based on HasActiveToken util

const HasActiveToken = require("../utils/HasActiveToken");

const { TOKEN_ALREADY_ISSUED } = require("../tools/Error.messages");
const PrettyError = require("../tools/Errors.tools");

module.exports = async (req, res, next) => {
  const { login } = req.body;

  if (!(await HasActiveToken(login))) next();
  else PrettyError(res, TOKEN_ALREADY_ISSUED);
};
