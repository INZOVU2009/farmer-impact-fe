import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

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

export const deactivateUser = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/useraccess/deactivate?id=${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
