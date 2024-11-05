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
        `${url}/groups/byStation?page=${currentPage}&&pageSize=${itemsPerPage}`
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
