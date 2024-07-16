/* eslint-disable */
import { getStaff } from "../../../api/userApi";
import {
  fetchFail,
  fetchPending,
  fetchSuccess,
} from "../../slices/staff/fetchSingleStaffSlice";

export const getSingleStaffById = (userId) => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const res = await getStaff(userId);
    dispatch(fetchSuccess(res));

    return res;
  } catch (error) {
    console.error("Fetch failed:", error);
    if (error) {
     
      return dispatch(fetchFail(error.message));
    }
   
    return dispatch(fetchFail(error.Error));
  }
};
