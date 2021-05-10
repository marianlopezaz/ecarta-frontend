import axios from "axios";
import errorHandler from "./errorhandler";

export async function getProject(url) {
  return await axios
    .get(url)
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

export async function getMenu(url) {
  return await axios
    .get(url)
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
