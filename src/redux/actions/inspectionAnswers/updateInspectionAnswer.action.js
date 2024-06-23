import { toast } from "react-toastify";
import { updateInspectionAnswer } from "../../../api/inspectionAnswersApi";

import {
  updatedAnswerFail,
  updatedAnswerPending,
  updatedAnswerSuccess,
} from "../../slices/inspectionAnswers/updateInspectionAnswerSlice";

export const editInspectionAnswer = (id, updatedAnswer) => async (dispatch) => {
  try {
    dispatch(updatedAnswerPending());
    const res = await updateInspectionAnswer(id, updatedAnswer);
    dispatch(updatedAnswerSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(updatedAnswerFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(updatedAnswerFail(error.Error));
  }
};
