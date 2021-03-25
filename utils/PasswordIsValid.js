const { verify } = require("../tools/Password.tools");

const axios = require("axios").default;

module.exports = async function (login, password) {
  login = login.trim().toLowerCase();
  password = password.trim();

  try {
    const { data } = await axios.get(
      `${process.env.RESOURCE_SERVER_URL}:${process.env.RESOURCE_SERVER_PORT}/auth/${login}`
    );

    return await verify(password, data.credential.password);
  } catch (err) {
    return false;
  }
};
