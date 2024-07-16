import { journalPending, journalSuccess,journalFail } from "../../slices/transactions/transactionByJournalSlice";
import { allTransactionsByJournalId } from "../../../api/coffeePurchaseApi";

export const fetchAllTransactionsByJournal= (token,journalId) => async (dispatch) => {
    try {
     
      dispatch(journalPending());
      const res = await allTransactionsByJournalId(token,journalId);
      dispatch(journalSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        return dispatch(journalFail(error.message));
      }
      return dispatch(journalFail(error.Error));
    }
  };
