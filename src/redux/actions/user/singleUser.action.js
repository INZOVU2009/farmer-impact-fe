/* eslint-disable */
import { getUser } from "../../../api/userApi";
import {
  fetchFail,
  fetchPending,
  fetchSuccess,
} from "../../slices/user/singleUserSlice";

export const getSingleUserById = (userId) => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const res = await getUser(userId);
    dispatch(fetchSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      return dispatch(fetchFail(error.message));
    }
    return dispatch(fetchFail(error.Error));
  }
};
