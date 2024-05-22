import { toast } from "react-toastify";
import { getAllUserAccess } from "../../../api/userAccessApi";
import {
  allAccessFail,
  allAccessPending,
  allAccessSuccess,
} from "../../slices/userAccess/fetchAllUserAccessSlice";

export const fetchAllUserAccess = () => async (dispatch) => {
  try {
    dispatch(allAccessPending());
    const res = await getAllUserAccess();
    dispatch(allAccessSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(allAccessFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(allAccessFail(error.Error));
  }
};
