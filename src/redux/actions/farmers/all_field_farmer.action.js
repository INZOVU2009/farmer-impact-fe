import {
  FarmerPending,
  FarmerSuccess,
  FarmerFailed,
} from "../../slices/farmers/all_field_farmerSlice";
import { toast } from "react-hot-toast";
import { getRecentFarmer } from "../../../api/recentFarmersApi";

export const fetchFieldFarmers =
  (currentPage, itemsPerPage) => async (dispatch) => {
    try {
      dispatch(FarmerPending());

      const res = await getRecentFarmer(currentPage, itemsPerPage);
      dispatch(FarmerSuccess(res));
      console.log(res);
    //   toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message}`);
        return dispatch(FarmerFailed(error.message));
      }
      toast.error(`${error.Error}`);
      return dispatch(FarmerFailed(error.Error));
    }
  };
