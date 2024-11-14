import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

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

export const getGroupsByStation = (currentPage, itemsPerPage, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/groups/byStation?page=${currentPage}&&pageSize=${itemsPerPage}`,
        {
          headers: { auth_token: ` ${token}` },
        }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const createGroup = (data, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/groups/create`, data, {
        headers: { auth_token: ` ${token}` },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const approveCreatedGroup = (data, token) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/groups/approve/${data}`, null, {
        headers: { auth_token: ` ${token}` },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const toggleGroup = (data, token) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/groups/toggle/${data}`, null, {
        headers: { auth_token: ` ${token}` },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
