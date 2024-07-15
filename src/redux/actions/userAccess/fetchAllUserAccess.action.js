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
      return dispatch(allAccessFail(error.message));
    }
    return dispatch(allAccessFail(error.Error));
  }
};
