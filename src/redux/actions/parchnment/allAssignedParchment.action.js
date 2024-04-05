import { allAssignedParchments } from "../../../api/parchmentApi";
import { fetchPending, fetchSuccess, fetchFail } from "../../slices/parchment/allAssignedParchmentSlice";


export const fetchAllAssignedParchments = () => async (dispatch) => {
    try {
     
      dispatch(fetchPending());
      const res = await allAssignedParchments();
      
      dispatch(fetchSuccess(res));
      toast.success(res.message);
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