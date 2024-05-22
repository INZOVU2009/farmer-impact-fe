import axios from "axios";
const url = "http://localhost:5000";
export const getRecentFarmer = (currentPage, itemsPerPage) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/user_registration/recentFarmers?page=${currentPage}&&pageSize=${itemsPerPage}`
      )
      .then((response) => {
        console.log(response.data);
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

export const approveFarmer = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${url}/user_registration/approve?id=${id}`)
        .then((response) => resolve(response.data))
        .catch((error) => {
          if (error.response?.data !== undefined) {
            reject(error.response.data);
          }
          reject(error);
        });
    });
  };