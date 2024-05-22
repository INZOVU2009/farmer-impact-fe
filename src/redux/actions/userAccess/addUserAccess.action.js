import { toast } from "react-toastify";
import {
  accessFail,
  accessPending,
  accessSuccess,
} from "../../slices/userAccess/addUserAccessSlice";
import { addUserAccess } from "../../../api/userAccessApi";

export const createUserAccess = (id) => async (dispatch) => {
  try {
    dispatch(accessPending());
    const res = await addUserAccess(id);
    dispatch(accessSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(accessFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(accessFail(error.Error));
  }
};
