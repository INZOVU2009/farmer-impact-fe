import { toast } from "react-hot-toast";
import { deactivateUser } from "../../../api/userAccessApi";
import {
  deactivateFail,
  deactivatePending,
  deactivateSuccess,
} from "../../slices/userAccess/deactivateUserSlice";

export const deactivateUserAccess = (id) => async (dispatch) => {
  try {
    dispatch(deactivatePending());
    const res = await deactivateUser(id);
    toast.success(res.message);
    dispatch(deactivateSuccess(res));
    return res;
  } catch (error) {
    if (error) {
   
      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(deactivateFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(deactivateFail(error.Error));
  }
};
