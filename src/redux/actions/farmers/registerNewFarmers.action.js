import { toast } from "react-hot-toast";
import {
  registerFail,
  registerPending,
  registerSuccess,
} from "../../slices/farmers/registerNewFarmersSlice";
import { submitNewFarmers } from "../../../api/recentFarmersApi";

export const registerFarmers = () => async (dispatch) => {
  try {
    dispatch(registerPending());
    const res = await submitNewFarmers();
    console.log("hehe", res);
    toast.success(res.message);
    dispatch(registerSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      console.log("huhu", error);
      return dispatch(registerFail(error.message));
    }
    toast.error(`${error.Error} `);
    console.log("huhuuuuu", error);
    return dispatch(registerFail(error.Error));
  }
};
