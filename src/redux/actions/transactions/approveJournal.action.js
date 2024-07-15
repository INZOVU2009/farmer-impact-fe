import { approveJournal } from "../../../api/coffeePurchaseApi";
import {
  approveFail,
  approvePending,
  approveSuccess,
} from "../../slices/transactions/approveJournalSlice";
import { toast } from "react-hot-toast";

export const approveJoulnal = (token, id) => async (dispatch) => {
  try {
    dispatch(approvePending());

    const res = await approveJournal(token, id);
    dispatch(approveSuccess(res));
    toast.success(res.message);
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(approveFail(error.message));
    }
    toast.error(`${error.Error}`);

    return dispatch(approveFail(error.Error));
  }
};
