import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const getAllTrainings = (currentPage, itemsPerPage, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/trainings/allTrainings?page=${currentPage}&&pageSize=${itemsPerPage}`,
        {
          headers: { auth_token: ` ${token}` },
        }
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

export const createNewCourse = (data, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/trainings/create`, data, {
        headers: { auth_token: ` ${token}` },
      })
      .then((response) => resolve(response.data))
      .catch((error) => {
        reject(error);
      });
  });
};
