import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const getLoadedWeightById = (id) => {
  console.log("data", id);
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/loadedweight/loadedweight/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const processContributions = (contributions) => {

  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/loadedweight/start_processing`, contributions)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const fetchProcessedContributions = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/loadedweight/contributions`,{
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

export const getProcessedContributionsById = (id) => {
  console.log("data", id);
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/loadedweight/contributions_by_id/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
