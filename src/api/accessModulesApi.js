import axios from "axios";

const url = "http://localhost:5000";

export const getAllModules = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/accessControl/allAccessControl`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.data !== undefined) {
          reject(error.response.data);
          console.log("err", error);
        }
        reject(error);
        console.log("err", error);
      });
  });
};

export const addPermissions = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/accessControl/assignPermissions`, data)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const updateModule = (data,id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/accessControl/update?id=${id}`, data)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
