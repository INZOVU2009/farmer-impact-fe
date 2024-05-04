
import { toast } from "react-toastify";
import { fetchFail, fetchPending, fetchSuccess } from "../../slices/parchment/reportByIdSlice";
import { deriveryReportById } from "../../../api/parchmentApi";
  
  export const fetchReportById =(id) => async (dispatch) => {
      try {
        dispatch(fetchPending());
        const res = await deriveryReportById(id);
        console.log("res", res);
        dispatch(fetchSuccess(res));
        toast.success(res.message);
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
  