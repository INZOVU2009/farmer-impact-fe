import axios from "axios";

const url = "http://localhost:5000";

export const assignNewParchment = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}/parchments/assign`,
          data,
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


  export const ParchmentGrade = (data,token) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${url}/parchments/parchGrade`,
          data,
          {
            headers: { auth_token: ` ${token}` },
          }
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


//get all assigned parchments
export const allAssignedParchments= async () => {
  try {
    const response = await axios.get(`${url}/parchments/allAssignedParchments`, {});
    return response.data;
  } catch (error) {
    if (error.response.data !== undefined) {
      throw error.response.data;
    }
    throw error;
  }
};