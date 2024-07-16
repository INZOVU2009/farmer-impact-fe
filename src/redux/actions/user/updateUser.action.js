/* eslint-disable */
import { toast } from "react-hot-toast";
import { updateUser } from "../../../api/userApi";
import {
  updatePending,
  updateFail,
  updateSuccess,
} from "../../slices/user/updateUserSlice";

export const updateExistingUser = (id, data) => async (dispatch) => {
  try {
    dispatch(updatePending());
    const res = await updateUser(id, data);
    dispatch(updateSuccess(res));
    toast.success(res.message);
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(updateFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(updateFail(error.Error));
  }
};
