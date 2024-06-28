import { toast } from "react-toastify";
import { removeTranslation } from "../../../api/translationsApi";
import {
  removedTranslationFail,
  removedTranslationPending,
  removedTranslationSuccess,
} from "../../slices/translations/deleteTranslationSlice";

export const deleteTranslation = (id) => async (dispatch) => {
  try {
    dispatch(removedTranslationPending());
    const res = await removeTranslation(id);
    dispatch(removedTranslationSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(removedTranslationFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(removedTranslationFail(error.Error));
  }
};
