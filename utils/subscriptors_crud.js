// Axios
import axios from "axios";
import Config from "./config";
import errorHandler from "./errorhandler";

export async function addNewSubscriptor(subscription_id, auth_token) {
      return await axios
        .post(`${Config.api_url}/subscription/${subscription_id}/subscriber`, null, {
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
    

    export async function suspendSubscriptor(subscription_id, auth_token) {
      return await axios
        .get(`${Config.api_url}/subscription/${subscription_id}/subscriber/suspend`, {
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
    