
import {toast} from "react-hot-toast";
import { addInspectionAnswer } from "../../../api/inspectionAnswersApi";

import { newAnswerFail, newAnswerPending, newAnswerSuccess } from "../../slices/inspectionAnswers/addNewInspectionAnswerSlice";

export const addNewInspectionAnswer = (id,token,formData) => async (dispatch) => {
  try {
    dispatch(newAnswerPending());
    const res = await addInspectionAnswer(id,token,formData);
    dispatch(newAnswerSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(newAnswerFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(newAnswerFail(error.Error));
  }
};
