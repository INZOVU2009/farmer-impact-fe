import {toast} from "react-hot-toast";
import {
  householdTreesFail,
  householdTreesPending,
  householdTreesSuccess,
} from "../../slices/householdTrees/getAllHouseholdTreesSlice";
import { getHouseholdTreeServey } from "../../../api/householdTreesApi";

export const fetchAllHouseholdTrees =
  (currentPage, itemsPerPage) => async (dispatch) => {
    try {
      dispatch(householdTreesPending());
      const res = await getHouseholdTreeServey(currentPage, itemsPerPage);
      dispatch(householdTreesSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message} `);

        return dispatch(householdTreesFail(error.message));
      }
      toast.error(`${error.Error}`);

      return dispatch(householdTreesFail(error.Error));
    }
  };
