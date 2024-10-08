import {toast} from "react-hot-toast";
import { fetchProcessedContributions } from "../../../api/deliveryProcessingApi";
import { contributionsFail, contributionsPending, contributionsSuccess } from "../../slices/deliveryProcessing/getProcessedContributionsSlice";
  
  export const fetchAllProcessedContributions = (token) => async (dispatch) => {
    try {
      dispatch(contributionsPending());
      const res = await fetchProcessedContributions(token);
      dispatch(contributionsSuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
        console.log("err", error);
  
        toast.error(`${error.message} `);
        console.log("errrrr", error.message);
        return dispatch(contributionsFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr", error);
      return dispatch(contributionsFail(error.Error));
    }
  };
  