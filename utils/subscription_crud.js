// Axios
import axios from "axios";
import Config from "./config";
import errorHandler from "./errorhandler";
import config from "./config";

export async function getSubscription(url, auth_token) {
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

      response.result.map((element,i) => {
        response.result[i].description = element.description.split(',')
      })
      
      return response;
    })
    .catch((error) => {
      return errorHandler(error);
    });
}


export async function addNewSubscription(data, auth_token) {
  return await axios
    .post(`${Config.api_url}/subscription`, data, {
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



export async function editSubscription(data, auth_token) {
    return await axios
      .post(`${Config.api_url}/subscription/${data.id}`, data, {
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
  
  
  


export async function deleteSubscription(id, auth_token) {
  return await axios
    .delete(`${Config.api_url}/subscription/${id}`, {
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


export async function getCurrentSubscription(url,auth_token){
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  })
  .then((json) => {
    let response = {
      success: true,
      result: json.data.data,
    };

    response.result.suscription.description = response.result.suscription.description.split(',');

    return response;
  })
  .catch((error) => {
    return errorHandler(error);
  });
}
