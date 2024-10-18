import {toast} from "react-hot-toast";
import { 
    TreesPending,
    TreesSuccess,
    TreesFail
} from "../../slices/householdTrees/getAllNewTreeServeySlice"
import { getHouseholdTreeServey } from "../../../api/householdTreesApi";

export const fetchAllTrees =
  (currentPage, itemsPerPage) => async (dispatch) => {
    try {
      dispatch(TreesPending());
      const res = await getHouseholdTreeServey(currentPage, itemsPerPage);
      dispatch(TreesSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message} `);

        return dispatch(TreesFail(error.message));
      }
      toast.error(`${error.Error}`);

      return dispatch(TreesFail(error.Error));
    }
  };
