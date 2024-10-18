import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const getHouseholdTreeServey = (currentPage, itemsPerPage) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/trees/allNewTreessurvey?page=${currentPage}&&pageSize=${itemsPerPage}`
      )
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const approveHouseholdTree = (id, token) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/trees/approve?id=${id}`, null, {
        headers: { auth_token: token },
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

export const getApprovedHouseholdTreeServey = (currentPage, itemsPerPage) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/trees/allApprovedTreessurvey?page=${currentPage}&&pageSize=${itemsPerPage}`
      )
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
export const verifyHouseholdTree = (id, token) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/trees/verify?id=${id}`, null, {
        headers: { auth_token: token },
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
export const getVerifiedHouseholdTreeServey = (currentPage, itemsPerPage) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/trees/allVerifiedTreessurvey?page=${currentPage}&&pageSize=${itemsPerPage}`
      )
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
export const fetchTreeDetails = (kpTreesSurvey) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/trees/treedetails?kpTreesSurvey=${kpTreesSurvey}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
export const getTreeSurveyByDate = (startDate, endDate) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/trees/treesurveybydate?startDate=${startDate}&&endDate=${endDate}`
      )
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
