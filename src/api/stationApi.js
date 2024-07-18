import axios from 'axios';
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;


export const allStations = async () => {
    try {
      const response = await axios.get(`${url}/station/stations`, {});
      return response.data;
    } catch (error) {
      if (error.response.data !== undefined) {
        throw error.response.data;
      }
      throw error;
    }
  };