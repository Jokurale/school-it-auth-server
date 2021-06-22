import {
  JWT_ACCESS_EXPIRY_TIME,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRY_TIME,
  JWT_REFRESH_SECRET,
  TOKEN_AUDIENCE,
  TOKEN_ISSUER,
} from "../../../config/constants";

import { UserHelper } from "../helpers";
import jwt from "jsonwebtoken";

const meta = {
  iss: TOKEN_ISSUER,
  aud: TOKEN_AUDIENCE,
};

const generateToken = async (
  login: Login
): Promise<NewTokenSet | undefined> => {
  // *** Retrive user information from Resource Server
  const credentials = await UserHelper.getUserCredentialInfo(login);

  // *** Extract required data from response
  if (credentials) {
    const { id, credential } = credentials;
    const { role } = credential;

    // *** Prepare JWT payload
    const payload = {
      id,
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

    const tokens = {
      accessToken,
      refreshToken,
      accessTokenExpiry:
        process.env.JWT_ACCESS_EXPIRY_NO_UNIT &&
        +process.env.JWT_ACCESS_EXPIRY_NO_UNIT,
    } as NewTokenSet;

    return tokens;
  }
};

const verifyToken = (token: Token): JWTVerificationResult | false => {
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
  return verificationResult as JWTVerificationResult | false;
};

const refreshToken = async (
  login: Login
): Promise<NewAccessToken | undefined> => {
  // *** Retrive user information from Resource Server
  const credentials = await UserHelper.getUserCredentialInfo(login);

  // *** Extract required data from response
  if (credentials) {
    const { id, credential } = credentials;
    const { role } = credential;

    // *** Prepare JWT payload
    const payload = {
      id,
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

    const token = {
      accessToken,
      accessTokenExpiry:
        process.env.JWT_ACCESS_EXPIRY_NO_UNIT &&
        +process.env.JWT_ACCESS_EXPIRY_NO_UNIT,
    };

    return token;
  }
};

export default {
  verifyToken,
  refreshToken,
  generateToken,
};
