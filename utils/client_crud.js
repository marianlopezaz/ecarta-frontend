import axios from "axios";
import errorHandler from "./errorhandler";

export async function getClients(url, auth_token) {
  return await axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    })
    .then((json) => {
      let response = {
        success: true,
        result: json.data.data,
      };
      return response;
    })
    .catch((error) => {
      return errorHandler(error);
    });
}