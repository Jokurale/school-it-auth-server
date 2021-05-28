// *** Guard based on PasswordIsValid util

const { isValid } = require("../helpers/PasswordHelper");
const { ErrorHelper } = require("../helpers/ErrorHelper");

const { PASSWORD_INVALID } = require("../../../config/constants");

module.exports = async (req, res, next) => {
  const { login, password } = req.body;

  if (await isValid(login, password)) next();
  else ErrorHelper(res, PASSWORD_INVALID);
};
