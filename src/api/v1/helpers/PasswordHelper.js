// *** Password.tools serves as facade between code and real salting

const axios = require("axios").default;

const bcrypt = require("bcrypt");

const {
  PASSWORD_SALT,
  RESOURCE_SERVER_URL,
  RESOURCE_SERVER_PORT,
} = require("../../../config/constants");

async function verify(password, hash) {
  return await bcrypt.compare(password.trim() + PASSWORD_SALT, hash);
}

async function isValid(login, password) {
  login = login.trim().toLowerCase();
  password = password.trim();

  try {
    const { data } = await axios.get(
      `${RESOURCE_SERVER_URL}:${RESOURCE_SERVER_PORT}/auth/${login}`
    );

    return await verify(password, data.credential.password);
  } catch (err) {
    return false;
  }
}

module.exports = { verify, isValid };
