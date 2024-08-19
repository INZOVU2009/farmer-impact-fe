
import {
  attendencesFail,
  attendencesPending,
  attendencesSuccess,
} from "../../slices/trainingAttendance/fetchAllAttendencesSlice";
import { getAllAttendances } from "../../../api/trainingAttendanceAPI";

export const fetchAllTrainingsAttendance =
  (currentPage, itemsPerPage,from,to) => async (dispatch) => {
    try {
      dispatch(attendencesPending());
      const res = await getAllAttendances(currentPage,itemsPerPage,from,to);
      dispatch(attendencesSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        return dispatch(attendencesFail(error.message));
      }
      return dispatch(attendencesFail(error.Error));
    }
  };
