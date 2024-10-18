import { toast } from "react-hot-toast";
import { getVerifiedHouseholdTreeServey } from "../../../api/householdTreesApi";

import {
  VerifiedHouseholdTreesFail,
  VerifiedHouseholdTreesPending,
  VerifiedHouseholdTreesSuccess,
} from "../../slices/householdTrees/getAllVerifiedHouseholdTreesSlice";

export const fetchAllVerifiedHouseholdTrees =
  (currentPage, itemsPerPage) => async (dispatch) => {
    try {
      dispatch(VerifiedHouseholdTreesPending());
      const res = await getVerifiedHouseholdTreeServey(
        currentPage,
        itemsPerPage
      );
      dispatch(VerifiedHouseholdTreesSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message} `);

        return dispatch(VerifiedHouseholdTreesFail(error.message));
      }
      toast.error(`${error.Error}`);

      return dispatch(VerifiedHouseholdTreesFail(error.Error));
    }
  };
