// *** Password helper takes role of facade between requests and password buisness logic

import axios from "axios";

import bcrypt from "bcrypt";

import {
  PASSWORD_SALT,
  RESOURCE_SERVER_URL,
  RESOURCE_SERVER_PORT,
} from "../../../config/constants";

const verify = async (password: Password, hash: PasswordHash) => {
  return await bcrypt.compare(password.trim() + PASSWORD_SALT, hash);
};

const isValid = async (login: Login, password: Password) => {
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
};

export default {
  verify,
  isValid,
};
