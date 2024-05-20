import axios from "axios";

const url = "http://localhost:5000";
export const getAllGroups = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/groups/allGroups`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
