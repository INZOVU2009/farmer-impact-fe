import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const getBucketByDayLotNumber = (day_lot_number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/buckets/bucket?day_lot_number=${day_lot_number}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
export const updateBucket = (day_lot_number, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/buckets/update?day_lot_number=${day_lot_number}`, data)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const getBucketWeightByDayLotNumber = (day_lot_number) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/buckets/bucketWeight?day_lot_number=${day_lot_number}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const updateBucketWeight = (day_lot_number, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/buckets/updateWeight?day_lot_number=${day_lot_number}`, data)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};
