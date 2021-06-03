import { RESOURCE_SERVER_URI } from "../../../config/constants";
import axios from "axios";

// TODO: Implement REDIS-based credentials cache
const getUserCredentialInfo = async (
  login: Login
): Promise<false | UserCredentialsInfo> => {
  try {
    const response = await axios.get(RESOURCE_SERVER_URI + login);

    return response.data;
  } catch {
    return false;
  }
};

const userExists = async (login: Login): Promise<boolean> => {
  login = login.trim().toLowerCase();

  const credentials = await getUserCredentialInfo(login);

  if (credentials) return true;
  return false;
};

export default { userExists, getUserCredentialInfo };
