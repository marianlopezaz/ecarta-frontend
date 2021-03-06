const handleCrudErrors = (error) => {
  let response = {};
  if (error.response) {
    if (error.response.status === 400) {
      response = {
        success: false,
        unauthorized: false,
        result: error.response.data.data,
      };
    } else if (error.response.status === 401) {
      response = {
        success: false,
        unauthorized: true,
        result: [
          {
            message: error.response.data.data.message,
          },
        ],
      };
    } else if (error.response.status === 403) {
      response = {
        success: false,
        unauthorized: false,
        result: [
          {
            message: "No tenes permisos suficientes para realizar acción!",
          },
        ],
      };
    } else if (error.response.status === 404) {
      response = {
        success: false,
        unauthorized: false,
        result: [
          {
            message: error.response.data.data[0].message,
          },
        ],
      };
    } else if (error.response.status === 500) {
      response = {
        success: false,
        unauthorized: false,
        result: [
          {
            message: "Error interno del servidor",
          },
        ],
      };
    }
    else if (error.response.status === 409) {
      response = {
        success: false,
        unauthorized: false,
        error: 409,
        result: [
          {
            message: error.response.data.data[0].message,
          },
        ],
      }
    }else if (error.response.status === 402) {
      response = {
        success: false,
        unauthorized: false,
        error: 402,
        result: error.response.data.data
      }

  }else {
    response = {
      success: false,
      unauthorized: false,
      result: [
        {
          message: "Error de conexión",
        },
      ],
    };
  }
}

  return response;
};

export default handleCrudErrors;
