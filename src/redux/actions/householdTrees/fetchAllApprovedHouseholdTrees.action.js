import { toast } from "react-hot-toast";
import { getApprovedHouseholdTreeServey } from "../../../api/householdTreesApi";
import {
  ApprovedHouseholdTreesFail,
  ApprovedHouseholdTreesPending,
  ApprovedHouseholdTreesSuccess,
} from "../../slices/householdTrees/getAllApprovedHouseholdTreesSlice";

export const fetchAllApprovedHouseholdTrees =
  (currentPage, itemsPerPage, token) => async (dispatch) => {
    try {
      dispatch(ApprovedHouseholdTreesPending());
      const res = await getApprovedHouseholdTreeServey(
        currentPage,
        itemsPerPage,
        token
      );
      dispatch(ApprovedHouseholdTreesSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message} `);

        return dispatch(ApprovedHouseholdTreesFail(error.message));
      }
      toast.error(`${error.Error}`);

      return dispatch(ApprovedHouseholdTreesFail(error.Error));
    }
  };
