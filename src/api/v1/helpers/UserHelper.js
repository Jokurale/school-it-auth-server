const axios = require("axios").default;

const {
  RESOURCE_SERVER_URL,
  RESOURCE_SERVER_PORT,
} = require("../../../config/constants");

module.exports = async function userExists(login) {
  login = login.trim().toLowerCase();

  try {
    const { data } = await axios.get(
      `${RESOURCE_SERVER_URL}:${RESOURCE_SERVER_PORT}/auth/${login}`
    );

    if (data !== null) return true;
    return false;
  } catch (err) {
    return false;
  }
};
