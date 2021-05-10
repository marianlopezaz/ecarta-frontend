// Axios
import axios from "axios";
import Config from "./config";
import { loadState } from "../redux/immutableState";
//import { register } from "../redux/actions/userActions";
import errorHandler from "./errorhandler";

const Auth = {
  async register(data) {
    return axios
      .post(`${Config.api_url}/user/register`, data)
      .then((json) => {
        if (json.data.success) {
          const {
            name,
            surname,
            id,
            role,
            auth_token,
            cellphone,
            email,
          } = json.data.data;
          let userData = {
            name,
            surname,
            id,
            auth_token,
            role,
            cellphone,
            email,
          };
          let appState = {
            success: true,
            user: userData,
          };
          return appState;
        } else {
          let error = {
            success: false,
            message: `${json.data.data}. Intenta nuevamente!`,
          };
          return [error];
        }
      })
      .catch((error) => {
        return errorHandler(error);
      });
  },

  async login(user, password) {
    var formData = new FormData();
    formData.append("email", user);
    formData.append("password", password);

    return axios
      .post(`${Config.api_url}/user/login/`, formData)
      .then((json) => {

        if (json.data.success) {
          const {
            name,
            surname,
            id,
            role,
            auth_token,
            cellphone,
            email,
          } = json.data.data;
          let userData = {
            name,
            surname,
            id,
            auth_token,
            role,
            cellphone,
            email,
          };
          let appState = {
            isLoggedIn: true,
            user: userData,
          };
          return appState;
        } else {
          let response = {
            isLoggedIn: false,
            result : [
             { message: `${json.data.data}. Intenta nuevamente!`},
            ]
          };
          return response;
        }
      })
      .catch((error) => {
        return errorHandler(error); 
      });
  },

  async logout(auth_token) {
    return axios
      .get(`${Config.api_url}/user/logout/`, {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      })
      .then((json) => {
        if (json.data.success) {
          return { success: true, data: json.data.data };
        } else {
          return {
            success: false,
            unauthorized: false,
            result: [{ message: `${json.data.data}. Intenta nuevamente!` }],
          };
        }
      })
      .catch((error) => {
        return errorHandler(error);
      });
  },

  checkAuth() {
    const state = loadState();
    return state;
  },
};

export async function requestResetPassword(email) {
  return await axios
    .get(`${Config.api_url}/auth/password/request-reset/${email}`)
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

export async function resetPassword(data) {
  return await axios
    .post(`${Config.api_url}/auth/password/reset`, data)
    .then((json) => {
      console.log(json);
      if (json.data.success) {
        const {
          name,
          surname,
          id,
          role,
          auth_token,
          cellphone,
          email,
        } = json.data.data;
        let userData = {
          name,
          surname,
          id,
          auth_token,
          role,
          cellphone,
          email,
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
        };
        return appState;
      } else {
        let error = {
          isLoggedIn: false,
          unauthorized: false,
          message: [{ message: `${json.data.data}. Intenta nuevamente!` }],
        };
        return error;
      }
    })
    .catch((error) => {
      return errorHandler(error);
    });
}

export default Auth;
