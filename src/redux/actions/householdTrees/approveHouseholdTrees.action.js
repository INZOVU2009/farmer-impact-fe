import { toast } from "react-hot-toast";
import { approveFail, approvePending, approveSuccess } from "../../slices/householdTrees/approveHouseholdTreesSlice";
import { approveHouseholdTree } from "../../../api/householdTreesApi";


export const approveTrees = (id,token) => async (dispatch) => {
  try {
    dispatch(approvePending());
    const res = await approveHouseholdTree(id,token);
    toast.success(res.message);
    dispatch(approveSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(approveFail(error.message));
    }
    toast.error(`${error.Error} `);
    return dispatch(approveFail(error.Error));
  }
};
