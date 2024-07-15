
import {toast} from "react-hot-toast";
import { deriveryReportLotById } from "../../../api/parchmentApi";
import { reportLotFail, reportLotPending, reportLotSuccess } from "../../slices/parchment/reportLotByIdSlice";
  
  export const fetchReportLotById =(id) => async (dispatch) => {
      try {
        dispatch(reportLotPending());
        const res = await deriveryReportLotById(id);
      
        dispatch(reportLotSuccess(res));
        // toast.success(res.message);
        return res;
      } catch (error) {
        if (error) {
          console.log("err", error);
  
          toast.error(`${error.message} `);
          return dispatch(reportLotFail(error.message));
        }
        toast.error(`${error.Error}`);
        console.log("errrr", error);
  
        return dispatch(reportLotFail(error.Error));
      }
    };
  