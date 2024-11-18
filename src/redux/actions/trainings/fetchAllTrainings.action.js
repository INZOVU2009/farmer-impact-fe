import {
  trainingsFail,
  trainingsPending,
  trainingsSuccess,
} from "../../slices/trainings/fetchAllTrainingsSlice";
import { getAllTrainings } from "../../../api/trainingsApi";

export const fetchAllTrainings =
  (currentPage, itemsPerPage, token) => async (dispatch) => {
    try {
      dispatch(trainingsPending());
      const res = await getAllTrainings(currentPage, itemsPerPage, token);
      dispatch(trainingsSuccess(res));

      return res;
    } catch (error) {
      if (error) {
        return dispatch(trainingsFail(error.message));
      }
      return dispatch(trainingsFail(error.Error));
    }
  };
