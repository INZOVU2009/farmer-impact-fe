import axios from "axios";

const url = "http://localhost:5000";
export const getAllTranslations = (currentPage,itemsPerPage) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/translations/allTranslations?page=${currentPage}&&pageSize=${itemsPerPage}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

