import {
  journalPending,
  journalSuccess,
  journalFail,
} from "../../slices/transactions/journalsByCherryLotSlice";
import { allJournalsByCherryLotId } from "../../../api/coffeePurchaseApi";

export const fetchAllJournalsByCherryLotId =
  (token, cherryLotId) => async (dispatch) => {
    try {
      dispatch(journalPending());
      const res = await allJournalsByCherryLotId(token, cherryLotId);

      dispatch(journalSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        return dispatch(journalFail(error.message));
      }
      return dispatch(journalFail(error.Error));
    }
  };
