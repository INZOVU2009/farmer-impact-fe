
import {toast} from "react-hot-toast";
import { fetchFail, fetchPending, fetchSuccess } from "../../slices/parchment/reportByIdSlice";
import { deriveryReportById } from "../../../api/parchmentApi";
  
  export const fetchReportById =(id) => async (dispatch) => {
      try {
        dispatch(fetchPending());
        const res = await deriveryReportById(id);
        console.log("res", res);
        dispatch(fetchSuccess(res));
    
        return res;
      } catch (error) {
        if (error) {
          console.log("err", error);
  
          toast.error(`${error.message} `);
          return dispatch(fetchFail(error.message));
        }
        toast.error(`${error.Error}`);
        console.log("errrr", error);
  
        return dispatch(fetchFail(error.Error));
      }
    };
  