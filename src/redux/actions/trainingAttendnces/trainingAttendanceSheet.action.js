import { toast } from "react-toastify";
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
        console.log("err", error);
        toast.error(`${error.message} `);
        console.log("errrrr", error.message);
        return dispatch(attendenceSheetFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr", error);
      return dispatch(attendenceSheetFail(error.Error));
    }
  };
