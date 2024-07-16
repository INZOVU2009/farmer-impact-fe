import {
  trainingsFail,
  trainingsPending,
  trainingsSuccess,
} from "../../slices/trainings/fetchAllTrainingsSlice";
import { getAllTrainings } from "../../../api/trainingsApi";

export const fetchAllTrainings = () => async (dispatch) => {
  try {
    dispatch(trainingsPending());
    const res = await getAllTrainings();
    dispatch(trainingsSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      return dispatch(trainingsFail(error.message));
    }
    return dispatch(trainingsFail(error.Error));
  }
};
