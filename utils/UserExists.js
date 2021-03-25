require("dotenv").config({ path: "../.env" });

const axios = require("axios").default;

module.exports = async function (login) {
  login = login.trim().toLowerCase();

  try {
    const { data } = await axios.get(
      `${process.env.RESOURCE_SERVER_URL}:${process.env.RESOURCE_SERVER_PORT}/auth/${login}`
    );

    if (data !== null) return true;
    return false;
  } catch (err) {
    return false;
  }
};
