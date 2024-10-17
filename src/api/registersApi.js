import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;
export const getFarmerRegistrations = (currentPage, itemsPerPage, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/farmer_registrations/registrations?page=${currentPage}&&pageSize=${itemsPerPage}`,
        {
          headers: { auth_token: ` ${token}` },
        }
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
export const getApprovedRegistrations = (currentPage, itemsPerPage, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/farmer_registrations/approved?page=${currentPage}&&pageSize=${itemsPerPage}`,
        {
          headers: { auth_token: ` ${token}` },
        }
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
export const getVerifiedRegistrations = (currentPage, itemsPerPage, token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/farmer_registrations/verified?page=${currentPage}&&pageSize=${itemsPerPage}`,
        {
          headers: { auth_token: ` ${token}` },
        }
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
export const verifyRegistration = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/farmer_registrations/verify?id=${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const approveRegistration = (id, token) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/farmer_registrations/approve?id=${id}`, null, {
        headers: { auth_token: ` ${token}` },
      })
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
export const proceedRegistrations = () => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/farmer_registrations/proceed`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
export const deleteRegistration = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${url}/farmer_registrations/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
