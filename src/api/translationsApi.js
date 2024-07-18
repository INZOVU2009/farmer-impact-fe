import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const getAllTranslations = (currentPage, itemsPerPage) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${url}/translations/allTranslations?page=${currentPage}&&pageSize=${itemsPerPage}`
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

export const removeTranslation = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${url}/translations/delete?id=${id}}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const changeTranslation = (id, updatedTranslation) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/translations/update?id=${id}}`, updatedTranslation)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const addPhrase = (token,newPhrase) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/translations/create`, newPhrase,  {
        headers: { auth_token: ` ${token}` },
      })
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
