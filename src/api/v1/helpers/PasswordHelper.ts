// *** Password helper takes role of facade between requests and password buisness logic

import { PASSWORD_SALT } from "../../../config/constants";
import { UserHelper } from "./";
import bcrypt from "bcrypt";

const verify = async (
  password: Password,
  hash: PasswordHash
): Promise<boolean> => {
  const cmp = password.trim() + String(PASSWORD_SALT);

  return await bcrypt.compare(cmp, hash);
};

const isValid = async (login: Login, password: Password): Promise<boolean> => {
  login = login.trim().toLowerCase();
  password = password.trim();

  const credentials = await UserHelper.getUserCredentialInfo(login);

  if (credentials) {
    const {
      credential: { password: validPassword },
    } = credentials;

    return await verify(password, validPassword);
  }

  return false;
};

export default {
  verify,
  isValid,
};
