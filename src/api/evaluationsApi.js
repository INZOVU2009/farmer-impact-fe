import axios from "axios";

const url = "http://localhost:5000";
export const getAllEvaluations = (currentPage, itemsPerPage) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/evaluations/evaluations?page=${currentPage}&&pageSize=${itemsPerPage}`
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
