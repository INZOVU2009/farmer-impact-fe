import {
  bucketsFail,
  bucketsPending,
  bucketsSuccess,
} from "../../slices/transactions/allBucketsSlice";
import { allBuckets } from "../../../api/coffeePurchaseApi";
export const fetchAllBuckets = () => async (dispatch) => {
  try {
    dispatch(bucketsPending());
    const res = await allBuckets();

    dispatch(bucketsSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      return dispatch(bucketsFail(error.message));
    }
    return dispatch(bucketsFail(error.Error));
  }
};
