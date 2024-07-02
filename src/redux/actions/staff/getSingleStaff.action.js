/* eslint-disable */
import { toast } from "react-toastify";
import { getStaff } from "../../../api/userApi";
import { fetchFail, fetchPending, fetchSuccess } from "../../slices/staff/fetchSingleStaffSlice";


export const getSingleStaffById = (userId) => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const res = await getStaff(userId);
    console.log("hehehe", res)
    dispatch(fetchSuccess(res));
    toast.success(res.message);
    return res;
  } catch (error) {
    console.error("Fetch failed:", error);
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(fetchFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(fetchFail(error.Error));
  }
};
