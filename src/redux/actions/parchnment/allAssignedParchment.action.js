import { allAssignedParchments } from "../../../api/parchmentApi";
import {
  fetchPending,
  fetchSuccess,
  fetchFail,
} from "../../slices/parchment/allAssignedParchmentSlice";

export const fetchAllAssignedParchments = (token) => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const res = await allAssignedParchments(token);
    dispatch(fetchSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(fetchFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(fetchFail(error.Error));
  }
};
