import { getAllAttendancesheets } from "../../../api/trainingAttendanceAPI";
import {
  attendenceSheetFail,
  attendenceSheetPending,
  attendenceSheetSuccess,
} from "../../slices/trainingAttendance/fetchAllAttendanceSheetSlice";

export const fetchAllTrainingsAttendanceSheet =
  (currentPage, itemsPerPage) => async (dispatch) => {
    try {
      dispatch(attendenceSheetPending());
      const res = await getAllAttendancesheets(currentPage, itemsPerPage);
      dispatch(attendenceSheetSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        return dispatch(attendenceSheetFail(error.message));
      }
      return dispatch(attendenceSheetFail(error.Error));
    }
  };
