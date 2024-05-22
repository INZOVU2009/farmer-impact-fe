import axios from "axios";

const url = "http://localhost:5000";
export const addUserAccess = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/useraccess/create?id=${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const getAllUserAccess = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/useraccess/alluseraccess`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const activateUser = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/useraccess/activate?id=${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
