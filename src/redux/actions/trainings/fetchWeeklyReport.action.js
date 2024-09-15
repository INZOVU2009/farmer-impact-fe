
import { weeklyReportFail, weeklyReportPending, weeklyReportSuccess } from "../../slices/trainings/fetchWeeklyReportSlice";
import { getWeeklyReport } from "../../../api/weeklyReportApi";
  
  export const fetchAllWeeklyReport = () => async (dispatch) => {
    try {
      dispatch(weeklyReportPending());
      const res = await getWeeklyReport();
    //   console.log("hello",res)
      dispatch(weeklyReportSuccess(res));
  
      return res;
    } catch (error) {
      if (error) {
        return dispatch(weeklyReportFail(error.message));
      }
      return dispatch(weeklyReportFail(error.Error));
    }
  };
  