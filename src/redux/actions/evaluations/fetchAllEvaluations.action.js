import {toast} from "react-hot-toast";
import {
  evaluationsFail,
  evaluationsPending,
  evaluationsSuccess,
} from "../../slices/evaluations/fetchAllEvaluatiosSlice";
import { getAllEvaluations } from "../../../api/evaluationsApi";

export const fetchAllEvaluations =
  (currentPage, itemsPerPage) => async (dispatch) => {
    try {
      dispatch(evaluationsPending());
      const res = await getAllEvaluations(currentPage, itemsPerPage);
      dispatch(evaluationsSuccess(res));

      return res;
    } catch (error) {
      if (error) {
        console.log("err", error);

        toast.error(`${error.message} `);
        console.log("errrrr", error.message);
        return dispatch(evaluationsFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr", error);
      return dispatch(evaluationsFail(error.Error));
    }
  };
