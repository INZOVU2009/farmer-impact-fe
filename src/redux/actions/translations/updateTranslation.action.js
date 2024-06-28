import { toast } from "react-toastify";
import { changeTranslation } from "../../../api/translationsApi";

import {
  updatedTranslationFail,
  updatedTranslationPending,
  updatedTranslationSuccess,
} from "../../slices/translations/updateTranslationSlice";

export const updateTranslation =
  (id, updatedTranslation) => async (dispatch) => {
    try {
      dispatch(updatedTranslationPending());
      const res = await changeTranslation(id, updatedTranslation);
      dispatch(updatedTranslationSuccess(res));

      return res;
    } catch (error) {
      if (error) {
        console.log("err", error);

        toast.error(`${error.message} `);
        console.log("errrrr", error.message);
        return dispatch(updatedTranslationFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr", error);
      return dispatch(updatedTranslationFail(error.Error));
    }
  };
