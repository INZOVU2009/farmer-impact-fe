
  import { toast } from "react-toastify";
import { singleReportFail, singleReportPending, singleReportSuccess } from "../../slices/parchment/getSingleReportSlice";
import { singleReport } from "../../../api/parchmentApi";
  
  export const fetchSingleReport = () => async (dispatch) => {
    try {
      dispatch(singleReportPending());
  
      const res = await singleReport();
  
      dispatch(singleReportSuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
        console.log("err", error);
  
        toast.error(`${error.message} `);
        console.log("errrrr", error.message);
        return dispatch(singleReportFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr", error);
      return dispatch(singleReportFail(error.Error));
    }
  };
  