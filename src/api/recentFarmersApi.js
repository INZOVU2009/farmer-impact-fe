import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const getRecentFarmer = (currentPage, itemsPerPage, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/user_registration/recentFarmers?page=${currentPage}&&pageSize=${itemsPerPage}`,
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
export const getPendingFarmers = (currentPage, itemsPerPage, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/user_registration/pendingFarmers?page=${currentPage}&&pageSize=${itemsPerPage}`,
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
export const getApprovedFarmer = (currentPage, itemsPerPage, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/user_registration/approvedFarmers?page=${currentPage}&&pageSize=${itemsPerPage}`,
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
export const approveFarmer = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/user_registration/approve?id=${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const approveApprovedFarmer = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/user_registration/pending?id=${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const submitNewFarmers = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/user_registration/farmers`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
