import { toast } from "react-toastify";
import {
  attendencesFail,
  attendencesPending,
  attendencesSuccess,
} from "../../slices/trainingAttendance/fetchAllAttendencesSlice";
import { getAllAttendances } from "../../../api/trainingAttendanceAPI";

export const fetchAllTrainingsAttendance =
  (currentPage, itemsPerPage) => async (dispatch) => {
    try {
      dispatch(attendencesPending());
      const res = await getAllAttendances(currentPage, itemsPerPage);
      dispatch(attendencesSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        console.log("err", error);
        toast.error(`${error.message} `);
        console.log("errrrr", error.message);
        return dispatch(attendencesFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr", error);
      return dispatch(attendencesFail(error.Error));
    }
  };
