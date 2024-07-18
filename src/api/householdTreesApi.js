import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const getAllHouseholdTrees = (currentPage,itemsPerPage) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/trees/allTrees?page=${currentPage}&&pageSize=${itemsPerPage}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};