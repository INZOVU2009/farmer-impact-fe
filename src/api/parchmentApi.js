import axios from "axios";

const url = "http://localhost:5000";

export const assignNewParchment = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}/parchments/assign`,
          data,
        )
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response?.data !== undefined) {
            reject(error.response.data);
          }
          reject(error);
        });
    });
  };