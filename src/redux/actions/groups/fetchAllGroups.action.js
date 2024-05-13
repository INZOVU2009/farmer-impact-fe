import { toast } from "react-toastify";
import {
  groupsFail,
  groupsPending,
  groupsSuccess,
} from "../../slices/groups/fetchAllGroupsSlice";
import { getAllGroups } from "../../../api/groupsApi";

export const fetchAllGroups = () => async (dispatch) => {
  try {
    dispatch(groupsPending());

    const res = await getAllGroups();

    dispatch(groupsSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(groupsFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(groupsFail(error.Error));
  }
};
