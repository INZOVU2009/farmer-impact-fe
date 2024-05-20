import { toast } from "react-toastify";
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
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(trainingsFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(trainingsFail(error.Error));
  }
};
