// *** Password helper takes role of facade between requests and password buisness logic

import axios from "axios";

import bcrypt from "bcrypt";

import { PASSWORD_SALT, RESOURCE_SERVER_URI } from "../../../config/constants";

const verify = async (password: Password, hash: PasswordHash) => {
  const cmp = password.trim() + String(PASSWORD_SALT);

  return await bcrypt.compare(cmp, hash);
};

const isValid = async (login: Login, password: Password) => {
  login = login.trim().toLowerCase();
  password = password.trim();

  try {
    const { data } = await axios.get(RESOURCE_SERVER_URI + login);

    return await verify(password, data.credential.password);
  } catch (err) {
    return false;
  }
};

export default {
  verify,
  isValid,
};
