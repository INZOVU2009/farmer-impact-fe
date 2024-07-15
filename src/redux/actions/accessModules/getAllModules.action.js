/* eslint-disable */
import {toast} from "react-hot-toast";
import { getAllModules } from "../../../api/accessModulesApi";
import {
  fetchFail,
  fetchPending,
  fetchSuccess,
} from "../../slices/accessModules/getAllModulesSlice";

export const getModules = () => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const res = await getAllModules();

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
