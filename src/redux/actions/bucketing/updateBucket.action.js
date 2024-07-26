import { toast } from "react-hot-toast";

import { updateBucket } from "../../../api/bucketingApi";
import { updateFail, updatePending, updateSuccess } from "../../slices/bucketing/updateBucketSlice";

export const editBucket = (day_lot_number,data) => async (dispatch) => {
  try {
    dispatch(updatePending());
    const res = await updateBucket(day_lot_number,data);
    toast.success(res.message)
    dispatch(updateSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);
      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(updateFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(updateFail(error.Error));
  }
};
