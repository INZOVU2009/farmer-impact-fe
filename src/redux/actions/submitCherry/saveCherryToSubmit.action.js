import { toast } from "react-hot-toast";
import {
  saveFail,
  savePending,
  saveSuccess,
} from "../../slices/submitCherry/saveCherryToSubmitSlice";
import { saveCherryToSubmit } from "../../../api/submitCherryApi";

export const saveCherry = (cherry_lot_id, data) => async (dispatch) => {
  try {
    dispatch(savePending());
    const res = await saveCherryToSubmit(cherry_lot_id, data);
    dispatch(saveSuccess(res));
    toast.success(res.message);
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(saveFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(saveFail(error.Error));
  }
};
