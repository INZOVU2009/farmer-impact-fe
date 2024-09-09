import {toast} from "react-hot-toast";
import { addInspectionQuestion } from "../../../api/evaluationsApi";
import { questionFail, questionPending, questionSuccess } from "../../slices/evaluations/addInspectionQuestionSlice";

export const addNewInspectionQuestion = (inspectionQuestion) => async (dispatch) => {
  try {
    dispatch(questionPending());
    const res = await addInspectionQuestion(inspectionQuestion);
    dispatch(questionSuccess(res));
    toast.success(res.message)

    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(questionFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(questionFail(error.Error));
  }
};
