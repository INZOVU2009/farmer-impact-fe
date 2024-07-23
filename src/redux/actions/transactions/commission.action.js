import { toast } from "react-hot-toast";
import {
  commissionPending,
  commissionSuccess,
  commissionFail,
} from "../../slices/transactions/addCommissionFees";

export const addCommission = (data) => async (dispatch) => {
  try {
    dispatch(commissionPending());
  const res =  dispatch(commissionSuccess(data));
    toast.success("Fees Added Successfully !!!");
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(commissionFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(commissionFail(error.Error));
  }
};
