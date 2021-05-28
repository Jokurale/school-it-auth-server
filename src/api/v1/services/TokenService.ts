import jwt from "jsonwebtoken";

import {
  JWT_ACCESS_EXPIRY_TIME,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRY_TIME,
  JWT_REFRESH_SECRET,
  RESOURCE_SERVER_URI,
  TOKEN_AUDIENCE,
  TOKEN_ISSUER,
} from "../../../config/constants";

import axios from "axios";

const meta = {
  iss: TOKEN_ISSUER,
  aud: TOKEN_AUDIENCE,
};

const generateToken = async (login: Login) => {
  try {
    // *** Retrive user information from Resource Server
    const user = await axios.get(RESOURCE_SERVER_URI + login);

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
      JWT_ACCESS_SECRET as string,
      {
        expiresIn: JWT_ACCESS_EXPIRY_TIME,
      }
    );

    // Payload-based refresh token generation
    const refreshToken = jwt.sign(
      { ...meta, payload },
      JWT_REFRESH_SECRET as string,
      {
        expiresIn: JWT_REFRESH_EXPIRY_TIME,
      }
    );

    const tokens = { accessToken, refreshToken };

    return tokens;
  } catch (err) {
    console.log(err);
  }
};

const verifyToken = (token: Token) => {
  // *** Prep result value
  let verificationResult;

  // *** Try to verify incoming JWT token
  try {
    verificationResult = jwt.verify(token, JWT_REFRESH_SECRET as string);
    // *** Catch potential fails
  } catch {
    verificationResult = false;
  }

  // *** Return verification result
  return verificationResult;
};

const refreshToken = async (login: Login) => {
  // *** Retrive user information from Resource Server
  const user = await axios.get(RESOURCE_SERVER_URI + login);

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
    JWT_ACCESS_SECRET as string,
    {
      expiresIn: JWT_ACCESS_EXPIRY_TIME,
    }
  );

  // *** Return new token
  return { accessToken: newAccessToken };
};

export default {
  verifyToken,
  refreshToken,
  generateToken,
};
