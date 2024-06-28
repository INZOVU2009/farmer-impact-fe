import { toast } from "react-toastify";
import { addPhrase } from "../../../api/translationsApi";
import {
  phraseFail,
  phrasePending,
  phraseSuccess,
} from "../../slices/translations/addNewPhraseSlice";

export const addNewPhraseTranslation = (token,newPhrase) => async (dispatch) => {
  try {
    dispatch(phrasePending());
    const res = await addPhrase(token,newPhrase);
    dispatch(phraseSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(phraseFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(phraseFail(error.Error));
  }
};
