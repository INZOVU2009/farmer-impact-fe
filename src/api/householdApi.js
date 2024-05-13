import axios from "axios";

const url = "http://localhost:5000";
export const getAllHousehold = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/households/allHouseholds`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
