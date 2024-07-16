import {toast} from "react-hot-toast";
import { approveApprovedFarmer } from "../../../api/recentFarmersApi";
import {
  approvedFail,
  approvedPending,
  approvedSuccess,
} from "../../slices/farmers/approveApprovedFarmerSlice";

export const approveApprovedFieldFarmer = (id) => async (dispatch) => {
  try {
    dispatch(approvedPending());
    const res = await approveApprovedFarmer(id);
    dispatch(approvedSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(approvedFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(approvedFail(error.Error));
  }
};
