// *** Guard based on UserExists util

const userExists = require("../helpers/UserHelper");

const { USER_DOES_NOT_EXISTS } = require("../../../config/constants");
const { ErrorHelper } = require("../helpers/ErrorHelper");

module.exports = async (req, res, next) => {
  const { login } = req.body;

  if (await userExists(login)) next();
  else ErrorHelper(res, USER_DOES_NOT_EXISTS);
};
