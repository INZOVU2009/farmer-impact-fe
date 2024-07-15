import { allJournalsByCherryLotId } from "../../../api/coffeePurchaseApi";
import { transactionsPending, transactionsSuccess, transactionsFail } from "../../slices/transactions/transactionByCherryLotSlice";
export const fetchAllTransactionsByCherryLot= (token,cherryLotId) => async (dispatch) => {
    try {
     
      dispatch(transactionsPending());
      const res = await allJournalsByCherryLotId(token,cherryLotId);
      dispatch(transactionsSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        return dispatch(transactionsFail(error.message));
      }
      return dispatch(transactionsFail(error.Error));
    }
  };
