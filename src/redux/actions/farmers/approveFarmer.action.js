import { toast } from "react-hot-toast";
import {
  approveFail,
  approvePending,
  approveSuccess,
} from "../../slices/farmers/approveFarmerSlice";
import { approveFarmer } from "../../../api/recentFarmersApi";

export const approveFieldFarmer = (id) => async (dispatch) => {
  try {
    dispatch(approvePending());
    const res = await approveFarmer(id);
    toast.success(res.message);
    dispatch(approveSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(approveFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(approveFail(error.Error));
  }
};
