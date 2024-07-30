import { toast } from "react-hot-toast";
import {  updateBucketWeight } from "../../../api/bucketingApi";
import { updateWeightFail, updateWeightPending, updateWeightSuccess } from "../../slices/bucketing/updateBucketWeightSlice";

export const editBucketWeight = (day_lot_number,data) => async (dispatch) => {
  try {
    dispatch(updateWeightPending());
    const res = await updateBucketWeight(day_lot_number,data);
    toast.success(res.message)
    dispatch(updateWeightSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);
      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(updateWeightFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(updateWeightFail(error.Error));
  }
};
