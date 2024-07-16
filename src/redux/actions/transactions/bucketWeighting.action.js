import { bucketWeighting } from "../../../api/coffeePurchaseApi";
import {toast} from "react-hot-toast";
import { weightFail, weightPending, weightSuccess } from "../../slices/transactions/bucketWeightingSlice";

export const addBucketweighting= (data) => async (dispatch) => {
    try {
      dispatch(weightPending());

      const res = await bucketWeighting(data);
      dispatch(weightSuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {

        toast.error(`${error.message} `);
        return dispatch(weightFail(error.message));
      }
      toast.error(`${error.Error}`);

      return dispatch(weightFail(error.Error));
    }
  };