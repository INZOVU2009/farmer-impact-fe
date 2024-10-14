import { toast } from "react-hot-toast";
import {
  pendingFarmersFail,
  pendingFarmersPending,
  pendingFarmersSuccess,
} from "../../slices/farmers/fetchPendingFarmersSlice";
import { getPendingFarmers } from "../../../api/recentFarmersApi";

export const fetchAllPendingFarmers =
  (currentPage, itemsPerPage, token) => async (dispatch) => {
    try {
      dispatch(pendingFarmersPending());

      const res = await getPendingFarmers(currentPage, itemsPerPage, token);
      dispatch(pendingFarmersSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message}`);
        return dispatch(pendingFarmersFail(error.message));
      }
      toast.error(`${error.Error}`);
      return dispatch(pendingFarmersFail(error.Error));
    }
  };
