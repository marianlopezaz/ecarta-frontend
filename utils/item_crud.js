import axios from "axios";
import Config from "./config";
import errorHandler from "./errorhandler";

export async function addItem(data, auth_token) {
  return await axios
    .post(`${Config.api_url}/item/add`, data, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        "Content-Type": "multipart/form-data"
      },
    })
    .then((json) => {
      if (json.data.success) {
        let response = {
          success: true,
          result: json.data.data,
        };
        return response;
      } else {
        let response = {
          success: false,
          result: json.data.data,
        };
        return response;
      }
    })
    .catch((error) => {
      return errorHandler(error);
    });
}

export async function editItem(data, auth_token) {
  return await axios
    .post(`${Config.api_url}/item/edit`, data, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    })
    .then((json) => {
      if (json.data.success) {
        let response = {
          success: true,
          result: json.data.data,
        };
        return response;
      } else {
        let response = {
          success: false,
          result: json.data.data,
        };
        return response;
      }
    })
    .catch((error) => {
      return errorHandler(error);
    });
}

export async function deleteItem(item_id, auth_token) {
  return await axios
    .delete(`${Config.api_url}/item/${item_id}`, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    })
    .then((json) => {
      if (json.data.success) {
        let response = {
          success: true,
          result: json.data.data,
        };
        return response;
      } else {
        let response = {
          success: false,
          result: json.data.data,
        };
        return response;
      }
    })
    .catch((error) => {
      return errorHandler(error);
    });
}