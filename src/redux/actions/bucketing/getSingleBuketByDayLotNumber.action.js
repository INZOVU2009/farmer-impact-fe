import { toast } from "react-hot-toast";
import {
  fetchFail,
  fetchPending,
  fetchSuccess,
} from "../../slices/bucketing/getSingleBucketByDayLotNumberSlice";
import { getBucketByDayLotNumber } from "../../../api/bucketingApi";

export const getSingleBucket = (day_lot_number) => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const res = await getBucketByDayLotNumber(day_lot_number);
    dispatch(fetchSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);

      return dispatch(fetchFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(fetchFail(error.Error));
  }
};
