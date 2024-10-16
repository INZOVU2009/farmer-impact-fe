import { toast } from "react-hot-toast";
import { getApprovedFarmer } from "../../../api/recentFarmersApi";
import {
  approvedFarmersFail,
  approvedFarmersPending,
  approvedFarmersSuccess,
} from "../../slices/farmers/fetchApprovedFarmersSlice";

export const fetchAllApprovedFarmers =
  (currentPage, itemsPerPage, token) => async (dispatch) => {
    try {
      dispatch(approvedFarmersPending());

      const res = await getApprovedFarmer(currentPage, itemsPerPage, token);
      dispatch(approvedFarmersSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message}`);
        return dispatch(approvedFarmersFail(error.message));
      }
      toast.error(`${error.Error}`);
      return dispatch(approvedFarmersFail(error.Error));
    }
  };
