import axios from "axios";

const url = "http://localhost:5000";

export const untraceableCoffee = (data,token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/untraceableCoffee/add`, data, {
        headers: { auth_token: ` ${token}` },
      })
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
