import { toast } from "react-hot-toast";
import {
  loadedWeightFail,
  loadedWeightPending,
  loadedWeightSuccess,
} from "../../slices/deliveryProcessing/getLoadedWeightByReportIdSlice";
import { getLoadedWeightById } from "../../../api/deliveryProcessingApi";

export const fetchloadedWeightByReportId = (id) => async (dispatch) => {
  try {
    dispatch(loadedWeightPending());
    const res = await getLoadedWeightById(id);
    dispatch(loadedWeightSuccess(res));
    toast.success(res.message);
    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(loadedWeightFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(loadedWeightFail(error.Error));
  }
};
