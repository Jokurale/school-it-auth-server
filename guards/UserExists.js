// *** Guard based on UserExists util

const UserExists = require("../utils/UserExists.js");

const { USER_DOES_NOT_EXISTS } = require("../tools/Error.messages");
const PrettyError = require("../tools/Errors.tools");

module.exports = async (req, res, next) => {
  const { login } = req.body;

  if (await UserExists(login)) next();
  else PrettyError(res, USER_DOES_NOT_EXISTS);
};
