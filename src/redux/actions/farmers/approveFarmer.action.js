import {toast} from "react-hot-toast";
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
    dispatch(approveSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(approveFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(approveFail(error.Error));
  }
};
