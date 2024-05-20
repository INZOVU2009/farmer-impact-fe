import axios from "axios";

// Base URL for the API
const url = "http://localhost:5000";

// Function to fetch recent farmers
export const getRecentFarmer = (currentPage,itemsPerPage) => {
    return new Promise((resolve, reject) => {
        // Make a GET request to the specified URL
        axios.get(`${url}/user_registration/recentFarmers?page=${currentPage}&&pageSize=${itemsPerPage}`)
            .then((response) => {
                // Resolve the promise with the response data if successful
                console.log(response.data);
                resolve(response.data);
                
            })
            .catch((error) => {
                // If an error occurs, check if there's a response data and reject with it
                if (error.response?.data !== undefined) {
                    reject(error.response.data);
                }
                // Otherwise, reject with the error itself
                reject(error);
            });
    });
};
