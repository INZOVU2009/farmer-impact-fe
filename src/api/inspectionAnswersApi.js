import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const getSingleAnswer = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/answers/answer/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const addInspectionAnswer = (id,token, formData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/answers/create/${id}`, formData, {
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

export const removeInspectionAnswer = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${url}/answers/delete?id=${id}}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const updateInspectionAnswer = (id, updatedAnswer) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/answers/update?id=${id}}`, updatedAnswer)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
