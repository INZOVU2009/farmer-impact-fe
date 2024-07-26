import { toast } from "react-hot-toast";

import { getBucketWeightByDayLotNumber } from "../../../api/bucketingApi";
import {
  fetchFail,
  fetchPending,
  fetchSuccess,
} from "../../slices/bucketing/getSingleBucketWeightByDayLotNumberSlice";

export const getSingleBucketWeight = (day_lot_number) => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const res = await getBucketWeightByDayLotNumber(day_lot_number);
    dispatch(fetchSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);

      return dispatch(fetchFail(error.message));
    }
    toast.error(`${error.Error}`);

    return dispatch(fetchFail(error.Error));
  }
};
