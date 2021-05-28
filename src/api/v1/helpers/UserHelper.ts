import axios from "axios";

import {
  RESOURCE_SERVER_URL,
  RESOURCE_SERVER_PORT,
} from "../../../config/constants";

const userExists = async (login: Login) => {
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

export default { userExists };
