import { toast } from "react-hot-toast";
import { createGroup } from "../../../api/groupsApi";
import {
  createFail,
  createPending,
  createSuccess,
} from "../../slices/groups/createNewGroupSlice";

export const createNewGroups = (data, token) => async (dispatch) => {
  try {
    dispatch(createPending());
    const res = await createGroup(data, token);
    toast.success(res.message);
    dispatch(createSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(createFail(error.message));
    }
    toast.error(`${error.Error} `);
    return dispatch(createFail(error.Error));
  }
};
