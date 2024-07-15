import {toast} from "react-hot-toast";
import { getSingleAnswer } from "../../../api/inspectionAnswersApi";
import {
  answerFail,
  answerPending,
  answerSuccess,
} from "../../slices/inspectionAnswers/getSingleInspectionAnswerSlice";

export const fetchSingleInspectionAnswer = (id) => async (dispatch) => {
  try {
    dispatch(answerPending());
    const res = await getSingleAnswer(id);
    dispatch(answerSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(answerFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(answerFail(error.Error));
  }
};
