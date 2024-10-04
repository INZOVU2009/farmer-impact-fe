import {
    transactionsPending,
    transactionsFail,
    transactionsSuccess,
  } from "../../slices/transactions/allTransactionsSlice";
  import { AllSupplierTransaction } from "../../../api/supplierInventoryApi";
  export const fetchAllTransactions = () => async (dispatch) => {
    try {
      dispatch(transactionsPending());
      const res = await AllSupplierTransaction();
  
      dispatch(transactionsSuccess(res));
      //console.log(res);
    return res;
    
    } catch (error) {
      if (error) {
        return dispatch(transactionsFail(error.message));
      }
      return dispatch(transactionsFail(error.Error));
    }
  };
  