import { updatePending, updateSuccess, updateFail } from "../../slices/transactions/updateTransaction";
import { updateTransactionById } from "../../../api/coffeePurchaseApi";
import {toast} from "react-hot-toast";

export const updateTransaction= (token,id,data) => async (dispatch) => {
    try {
      dispatch(updatePending());
      const res = await updateTransactionById(token,id,data);
      dispatch(updateSuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message} `);
        return dispatch(updateFail(error.message));
      }
      toast.error(`${error.Error}`);
      return dispatch(updateFail(error.Error));
    }
  };