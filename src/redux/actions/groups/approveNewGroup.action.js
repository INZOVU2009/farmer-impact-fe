import { toast } from "react-hot-toast";
import { approveCreatedGroup } from "../../../api/groupsApi";
import {
  approveFail,
  approvePending,
  approveSuccess,
} from "../../slices/groups/approveNewGroupSlice";

export const approveNewGroup = (data, token) => async (dispatch) => {
  try {
    dispatch(approvePending());
    const res = await approveCreatedGroup(data, token);
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
