import { toast } from "react-hot-toast";
import { verifyHouseholdTree } from "../../../api/householdTreesApi";
import {
  verifyFail,
  verifyPending,
  verifySuccess,
} from "../../slices/householdTrees/verifyHouseholdTreesSlice";

export const verifyTrees = (id,token) => async (dispatch) => {
  try {
    dispatch(verifyPending());
    const res = await verifyHouseholdTree(id,token);
    toast.success(res.message);
    dispatch(verifySuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(verifyFail(error.message));
    }
    toast.error(`${error.Error} `);
    return dispatch(verifyFail(error.Error));
  }
};
