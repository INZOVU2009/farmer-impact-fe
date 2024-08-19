import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const getAllUsersInspections = (from,to) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/inspections/allInspections?from=${from}&&to=${to}`
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
