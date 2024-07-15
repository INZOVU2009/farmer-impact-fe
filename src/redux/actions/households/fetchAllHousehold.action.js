import {toast} from "react-hot-toast";
import {
  householdsFail,
  householdsPending,
  householdsSuccess,
} from "../../slices/households/fetchAllHouseholdsSlice";
import { getAllHousehold } from "../../../api/householdApi";

export const fetchAllHouseHolds = () => async (dispatch) => {
  try {
    dispatch(householdsPending());

    const res = await getAllHousehold();

    dispatch(householdsSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(householdsFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(householdsFail(error.Error));
  }
};
