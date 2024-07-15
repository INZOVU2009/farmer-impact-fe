

import { dryWeighting } from "../../../api/coffeePurchaseApi";
import { weightingFail,weightingPending,weightingSuccess } from "../../slices/transactions/dryWeightingSlice";
export const fetchAllDryWeighting = () => async (dispatch) => {
    try {
     
      dispatch(weightingPending());
      const res = await dryWeighting();
      dispatch(weightingSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        return dispatch(weightingFail(error.message));
      }
      return dispatch(weightingFail(error.Error));
    }
  };