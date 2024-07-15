import { toast } from "react-hot-toast";
import { activateUser } from "../../../api/userAccessApi";
import {
  activateFail,
  activatePending,
  activateSuccess,
} from "../../slices/userAccess/activateUserSlice";

export const activateUserAccess = (id) => async (dispatch) => {
  try {
    dispatch(activatePending());
    const res = await activateUser(id);
    dispatch(activateSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(activateFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(activateFail(error.Error));
  }
};
