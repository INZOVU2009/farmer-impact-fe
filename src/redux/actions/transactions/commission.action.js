import { toast } from "react-hot-toast";
import {
  commissionPending,
  commissionSuccess,
  commissionFail,
} from "../../slices/transactions/addCommissionFees";

export const addCommission = (data) => async (dispatch) => {
  try {
    dispatch(commissionPending());
    dispatch(commissionSuccess(data));
    toast.success(res.message);
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(commissionFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(commissionFail(error.Error));
  }
};
