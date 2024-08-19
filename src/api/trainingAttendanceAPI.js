import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const getAllAttendances = (currentPage,itemsPerPage,from , to ) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/attendance/allAttendance?page=${currentPage}&&pageSize=${itemsPerPage}&&from=${from}&&to=${to}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};


export const getAllAttendancesheets = (currentPage,itemsPerPage) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/attendance/allAttendancesheet?page=${currentPage}&&pageSize=${itemsPerPage}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
