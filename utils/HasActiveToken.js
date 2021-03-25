const Token = require("../database/models/Token.model");

module.exports = async function (login) {
  const token = await Token.findOne({ login });

  if (token) return true;
  return false;
};
