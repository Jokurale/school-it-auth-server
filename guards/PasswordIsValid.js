// *** Guard based on PasswordIsValid util

const PasswordIsValid = require("../utils/PasswordIsValid");

const { PASSWORD_INVALID } = require("../tools/Error.messages");
const PrettyError = require("../tools/Errors.tools");

module.exports = async (req, res, next) => {
  const { login, password } = req.body;

  if (await PasswordIsValid(login, password)) next();
  else PrettyError(res, PASSWORD_INVALID);
};
