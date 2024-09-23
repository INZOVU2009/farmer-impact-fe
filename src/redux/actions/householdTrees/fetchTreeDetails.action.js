import { toast } from "react-hot-toast";
import { fetchTreeDetails } from "../../../api/householdTreesApi";
import {
  detailsFail,
  detailsPending,
  detailsSuccess,
} from "../../slices/householdTrees/fetchTreeDetailsSlice";

export const getTreeDetails = (kpTreesSurvey) => async (dispatch) => {
  try {
    dispatch(detailsPending());
    const res = await fetchTreeDetails(kpTreesSurvey);
    dispatch(detailsSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);

      return dispatch(detailsFail(error.message));
    }
    toast.error(`${error.Error}`);

    return dispatch(detailsFail(error.Error));
  }
};
