// Axios
import axios from "axios";
import Config from "./config";
import errorHandler from "./errorhandler";

export async function getProjects(url, auth_token) {
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

export async function addProject(data, auth_token) {
  return await axios
    .post(`${Config.api_url}/project/add`, data, {
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

export async function deleteProject(project_id, auth_token) {
  return await axios
    .delete(`${Config.api_url}/project/${project_id}`, {
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

export async function editProject(data, auth_token) {
  return await axios
    .post(`${Config.api_url}/project/edit`, data, {
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
