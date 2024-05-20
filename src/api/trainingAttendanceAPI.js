import axios from "axios";

const url = "http://localhost:5000";
export const getAllAttendances = (currentPage,itemsPerPage) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/attendance/allAttendance?page=${currentPage}&&pageSize=${itemsPerPage}`)
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
