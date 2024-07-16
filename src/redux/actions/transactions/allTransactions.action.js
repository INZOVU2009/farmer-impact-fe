
import { transactionsPending, transactionsSuccess,transactionsFail } from '../../slices/transactions/allTransactionsSlice'
import { allTransactions } from '../../../api/coffeePurchaseApi';


export const fetchAllTransactions = (token) => async (dispatch) => {
    try {
     
      dispatch(transactionsPending());
      const res = await allTransactions(token);
      
      dispatch(transactionsSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message} `);
        return dispatch(transactionsFail(error.message));
      }
      toast.error(`${error.Error}`);
      return dispatch(transactionsFail(error.Error));
    }
  };