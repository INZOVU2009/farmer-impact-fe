import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const getWeeklyReport = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/reports/weeklyReport`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
