import { toast } from "react-hot-toast";
import { getTreeSurveyByDate } from "../../../api/householdTreesApi";
import {
  surveyByDateFail,
  surveyByDatePending,
  surveyByDateSuccess,
} from "../../slices/householdTrees/getHouseholdTreeSurveyByDateSlice";

export const fetchHouseholdTreesSurveyByDate =
  (startDate, endDate, token) => async (dispatch) => {
    try {
      dispatch(surveyByDatePending());
      const res = await getTreeSurveyByDate(startDate, endDate, token);
      dispatch(surveyByDateSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        console.log("err", error);
        toast.error(`${error.message} `);
        console.log("errrrr", error.message);
        return dispatch(surveyByDateFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr", error);
      return dispatch(surveyByDateFail(error.Error));
    }
  };
