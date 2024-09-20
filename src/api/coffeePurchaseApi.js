import axios from "axios";
import { constants } from "../constants/constants";

const url = constants.SERVER_URL;

export const allStaff = async () => {
  try {
    const response = await axios.get(`${url}/user/staff`, {});
    return response.data;
  } catch (error) {
    if (error.response.data !== undefined) {
      throw error.response.data;
    }
    throw error;
  }
};

export const allTransactions = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/coffeePurchase/dailyJournal/`, {
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

export const allTransactionsByJournalId = (token, journalId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/coffeePurchase/dailyJournal/${journalId}`, {
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

export const allTransactionsByCherryLotId = (token, cherryLotId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/coffeePurchase/dailyLot/${cherryLotId}`, {
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

export const removeTransactionById = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/coffeePurchase/dailyJournal/transaction/${id}`, null, {
        headers: {
          auth_token: ` ${token}`,
        },
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

export const updateTransactionById = (token, id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${url}/coffeePurchase/dailyJournal/transaction/update/${id}`,
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

export const approveJournal = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${url}/coffeePurchase/dailyJournal/journal/approve/${id}`, null, {
        headers: {
          auth_token: ` ${token}`,
        },
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

export const addCommissionPrice = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/coffeePurchase/dailyJournal/fees/`, data, {
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

export const addCommissionFees = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/coffeePurchase/dailyJournal/commissions/`, data, {
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

export const allJournalsByCherryLotId = (token, cherryLotId) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/coffeePurchase/dailyJournal/journal/${cherryLotId}`, {
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

//all buckets

export const allBuckets = async () => {
  try {
    const response = await axios.get(`${url}/lots/buckets`, {});
    return response.data;
  } catch (error) {
    if (error.response.data !== undefined) {
      throw error.response.data;
    }
    throw error;
  }
};

export const dryWeighting = async () => {
  try {
    const response = await axios.get(`${url}/coffeePurchase/dryweighting`, {});
    return response.data;
  } catch (error) {
    if (error.response.data !== undefined) {
      throw error.response.data;
    }
    throw error;
  }
};

export const transactionBucket = (token, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/coffeePurchase/dailyJournal/journalBucket`, data, {
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

export const bucketWeighting = (data,token) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}/coffeePurchase/bucketWeight`, data ,  {
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
