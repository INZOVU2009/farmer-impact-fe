
import {
  translationsFail,
  translationsPending,
  translationsSuccess,
} from "../../slices/translations/fetchAllTranslationsSlice";
import { getAllTranslations } from "../../../api/translationsApi";

export const fetchAllTranslations =
  (currentPage, itemsPerPage) => async (dispatch) => {
    try {
      dispatch(translationsPending());
      const res = await getAllTranslations(currentPage, itemsPerPage);
      dispatch(translationsSuccess(res));

      return res;
    } catch (error) {
      if (error) {
        return dispatch(translationsFail(error.message));
      }
      return dispatch(translationsFail(error.Error));
    }
  };
