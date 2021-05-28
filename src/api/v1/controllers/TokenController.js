const {
  verifyToken,
  generateToken,
  refreshToken,
} = require("../services/TokenService");

const { ErrorHelper } = require("../helpers/ErrorHelper");
const { UNPROCESSABLE_TOKEN } = require("../../../config/constants");

// Routes and actions
const login = async (req, res) => {
  const { login } = req.body;

  const tokens = await generateToken(login);

  res.json(tokens);
};

const refresh = async (req, res) => {
  const token = req.token;

  const result = await verifyToken(token);

  if (result && "payload" in result) {
    const tokenResult = await refreshToken(result.payload.login);

    if (tokenResult) res.json(tokenResult);
  } else ErrorHelper(res, UNPROCESSABLE_TOKEN);
};

module.exports = {
  login,
  refresh,
};
