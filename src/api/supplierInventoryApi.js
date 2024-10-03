import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const AllSuppliers = async () => {
    try {
        const response = await axios.get(`${url}/user/supplier`, {});
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data); 
        }
        throw new Error('An unexpected error occurred');
    }
};

export const AllSupplierTransaction = async () =>{
    try {
        const response_data = await axios.get(`${url}/coffeePurchase/Journals/`, {})
        return response_data.data;
    } catch (error) {
        if(error.response_data.data !== undefined){
            throw error.response_data.data;
        }
        throw error;
    }
};

export const getCurrentSeason = async () =>{
    try {
        const response_data = await axios.get(`${url}/coffeePurchase/CurrentSeason/`, {})
        return response_data.data;
    } catch (error) {
        if(error.response_data.data !== undefined){
            throw error.response_data.data;
        }
        throw error;
    }
};