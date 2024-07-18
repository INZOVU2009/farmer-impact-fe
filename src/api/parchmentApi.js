import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;


export const assignNewParchment = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/parchments/assign`, data)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const ParchmentGrade = (data, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/parchments/parchGrade`, data, {
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

//get all assigned parchments
export const allAssignedParchments = async () => {
  try {
    const response = await axios.get(
      `${url}/parchments/allAssignedParchments`,
      {}
    );
    return response.data;
  } catch (error) {
    if (error.response.data !== undefined) {
      throw error.response.data;
    }
    throw error;
  }
};

//adjust parchment
export const parchmentAdjustment = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/parchments/adjust`, data)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

//Digital lading foarm

export const deliverParchment = (data, token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/parchmentTransport/deliverParchment`, data, {
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

//get all delivery reports
export const deliveryReports = async () => {
  try {
    const response = await axios.get(`${url}/parchmentTransport/reports`, {});
    return response.data;
  } catch (error) {
    if (error.response.data !== undefined) {
      throw error.response.data;
    }
    throw error;
  }
};

export const singleReport = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/parchmentTransport/reportLots?`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response?.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const deriveryReportById = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/parchmentTransport/report_by_id/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

export const deriveryReportLotById = (id) => {
  console.log("i am id ", id);
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/parchmentTransport/lot_by_id/${id}`)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.data !== undefined) {
          reject(error.response.data);
        }
        reject(error);
      });
  });
};

//  update delivery report

export const updateDeliveryReport = (data, id, token) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/parchmentTransport/update/${id}`, data, {
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
