import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;


export const saveCherryToSubmit = (cherry_lot_id,data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/cherrytortc/add/${cherry_lot_id}`, data)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};