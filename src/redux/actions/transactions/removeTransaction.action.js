import { removeTransactionById } from "../../../api/coffeePurchaseApi";
import { removePending, removeSuccess, removeFail } from "../../slices/transactions/removeTransactionSlice";
import {toast} from "react-hot-toast";

export const removeTransaction= (token,id) => async (dispatch) => {
    try {
      dispatch(removePending());
      const res = await removeTransactionById(token,id);
      dispatch(removeSuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message} `);
        return dispatch(removeFail(error.message));
      }
      toast.error(`${error.Error}`);
      return dispatch(removeFail(error.Error));
    }
  };