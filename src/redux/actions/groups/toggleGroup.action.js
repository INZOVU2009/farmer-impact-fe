import { toast } from "react-hot-toast";
import { toggleGroup } from "../../../api/groupsApi";
import {
  toggleFail,
  togglePending,
  toggleSuccess,
} from "../../slices/groups/toggleGroupSlice";

export const toggleGroupAction = (data, token) => async (dispatch) => {
  try {
    dispatch(togglePending());
    const res = await toggleGroup(data, token);
    toast.success(res.message);
    dispatch(toggleSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(toggleFail(error.message));
    }
    toast.error(`${error.Error} `);
    return dispatch(toggleFail(error.Error));
  }
};
