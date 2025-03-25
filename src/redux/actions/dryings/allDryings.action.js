import {
  fetchPending,
  fetchSuccess,
  fetchFail,
} from "../../slices/dryings/allDryingsSlice";
import { allDryings } from "../../../api/dryingsApi";
import { toast } from "react-toastify";
export const fetchAllDryings = () => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const res = await allDryings();
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
