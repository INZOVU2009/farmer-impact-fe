import {toast} from "react-hot-toast";
import { removeInspectionAnswer } from "../../../api/inspectionAnswersApi";
import {
  deletedAnswerFail,
  deletedAnswerPending,
  deletedAnswerSuccess,
} from "../../slices/inspectionAnswers/deleteInspectionAnswerSlice";

export const deleteInspectionAnswer = (id) => async (dispatch) => {
  try {
    dispatch(deletedAnswerPending());
    const res = await removeInspectionAnswer(id);
    toast.success(res.message);
    dispatch(deletedAnswerSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(deletedAnswerFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(deletedAnswerFail(error.Error));
  }
};
