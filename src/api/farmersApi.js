import axios from "axios";

const url = "http://localhost:5000";
export const getAllFarmers = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/farmers/allFarmers`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
