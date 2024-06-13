import { toast } from "react-toastify";
import {
  translationsFail,
  translationsPending,
  translationsSuccess,
} from "../../slices/translations/fetchAllTranslationsSlice";
import { getAllTranslations } from "../../../api/translationsApi";

export const fetchAllTranslations = (currentPage, itemsPerPage) => async (dispatch) => {
  try {
    dispatch(translationsPending());
    const res = await getAllTranslations(currentPage, itemsPerPage);
    dispatch(translationsSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(translationsFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(translationsFail(error.Error));
  }
};
