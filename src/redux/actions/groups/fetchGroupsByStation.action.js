import { toast } from "react-hot-toast";
import {
  groupsFail,
  groupsPending,
  groupsSuccess,
} from "../../slices/groups/fetchAllGroupsSlice";
import { getGroupsByStation } from "../../../api/groupsApi";

export const fetchAllGroupsByStation =
  (currentPage, itemsPerPage, token) => async (dispatch) => {
    try {
      dispatch(groupsPending());

      const res = await getGroupsByStation(currentPage, itemsPerPage, token);

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
