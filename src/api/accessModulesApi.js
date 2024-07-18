import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const getAllModules = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/accessControl/allAccessControl`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
          console.log("err", error);
        }
        reject(error);
        console.log("err", error);
      });
  });
};

export const getAssignedModules = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/accessControl/assigned/`, {
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

export const updateModule = (data, id) => {
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

export const getAssignedModulesToSingleUser = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/accessControl/singleAssigned?id=${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const createModule = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/accessControl/create?`, data)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
