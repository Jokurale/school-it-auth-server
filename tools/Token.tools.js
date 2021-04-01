const jwt = require("jsonwebtoken");
const Tokens = require("../database/models/Token.model");
require("dotenv").config({ path: "../.env" });

const axios = require("axios").default;

const meta = {
  iss: "sdly-school-it-auth-server",
  aud: "sdly-school-it-resource-server",
};

module.exports = {
  generate: async (login) => {
    try {
      // *** Retrive user information from Resource Server
      const user = await axios.get(
        `${process.env.RESOURCE_SERVER_URL}:${process.env.RESOURCE_SERVER_PORT}/auth/${login}`
      );

      // *** Extract required data from response
      const { id, email, credential } = user.data;
      const { role } = credential;

      // *** Prepare JWT payload
      const payload = {
        id,
        email,
        login,
        role,
      };

      // Payload-based access token generation
      const accessToken = jwt.sign(
        { ...meta, payload },
        process.env.JWT_ACCESS,
        {
          expiresIn: process.env.JWT_ACCESS_EXPIRY,
        }
      );

      // Payload-based refresh token generation
      const refreshToken = jwt.sign(
        { ...meta, payload },
        process.env.JWT_REFRESH,
        {
          expiresIn: process.env.JWT_REFRESH_EXPIRY,
        }
      );

      const tokens = { accessToken, refreshToken };

      // Saving new login-token pair to active token's pool
      Tokens({ login, refreshToken }).save();

      return tokens;
    } catch (err) {
      console.log(err);
    }
  },

  verify: async (token, type = "refresh") => {
    // *** Prep result value
    let verificationResult;

    // *** Try to verify incoming JWT token
    try {
      verificationResult = jwt.verify(
        token,
        type === "refresh" ? process.env.JWT_REFRESH : process.env.JWT_ACCESS
      );
      // *** Catch potential fails
    } catch {
      verificationResult = false;
    }

    // *** Return verification result
    return verificationResult;
  },

  revoke: async (refreshToken) => {
    // *** Remove refreshToken from database
    const result = await Tokens.deleteOne({ refreshToken });

    // *** Return result
    return result;
  },

  refresh: async (login) => {
    // *** Retrive user information from Resource Server
    const user = await axios.get(
      `${process.env.RESOURCE_SERVER_URL}:${process.env.RESOURCE_SERVER_PORT}/auth/${login}`
    );

    // *** Extract required data from response
    const { id, email, credential } = user.data;
    const { role } = credential;

    // *** Prepare JWT payload
    const payload = {
      id,
      email,
      login,
      role,
    };

    // *** Sign new token
    const newAccessToken = jwt.sign(
      { ...meta, payload },
      process.env.JWT_ACCESS,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRY,
      }
    );

    // *** Return new token
    return { accessToken: newAccessToken };
  },
};
