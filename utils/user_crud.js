// Axios
import axios from "axios";
import Config from "./config";
import errorHandler from "./errorhandler";

export async function editUser(data, auth_token) {
  return await axios
    .post(`${Config.api_url}/user/edit`, data, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    })
    .then((json) => {
      if (json.data.success) {
        const {
            name,
            surname,
            id,
            role,
            cellphone,
            email,
          } = json.data.data;
          let userData = {
            name,
            surname,
            id,
            role,
            cellphone,
            email
          };
        let response = {
          success: true,
          result: userData,
        };
        return response;
      } else {
        let response = {
          success: false,
          unauthorized: false,
          result: json.data.data,
        };
        return response;
      }
    })
    .catch((error) => {
      return errorHandler(error);
    });
} 


export async function verifyUserEmail(code){
    return axios.get(`${Config.confirm_email_url}/${code}`).then((json)=>{
      return json.data;
    })
    .catch((error) =>{
      return errorHandler(error);
    })
}

export async function resendEmailCode(email){
  return axios.get(`${Config.resend_code_url}/${email}`).then((json)=>{
    return json.data;
  })
  .catch((error) =>{
    return errorHandler(error);
  })
}

export async function changePassword(data, auth_token) {
  return await axios
    .post(`${Config.api_url}/auth/password`, data, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    })
    .then((json) => {
      if (json.data.success) {
        const { name, surname, id, role, cellphone, email, auth_token } = json.data.data;
        let userData = {
          name,
          surname,
          id,
          role,
          cellphone,
          email,
          auth_token,
        };
        let response = {
          success: true,
          result: userData,
        };
        return response;
      } else {
        let response = {
          success: false,
          unauthorized: false,
          result: json.data.data,
        };
        return response;
      }
    })
    .catch((error) => {
      return errorHandler(error);
    });
}