import { transactionBucket } from "../../../api/coffeePurchaseApi";
import { toast } from "react-hot-toast";
import {
  bucketFail,
  bucketPending,
  bucketSuccess,
} from "../../slices/transactions/transactionBucketSlice";

export const addTransactionBucket = (token, data) => async (dispatch) => {
  try {
    dispatch(bucketPending());
    const res = await transactionBucket(token, data);
    dispatch(bucketSuccess(res));
    toast.success(res.message);
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(bucketFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(bucketFail(error.Error));
  }
};
