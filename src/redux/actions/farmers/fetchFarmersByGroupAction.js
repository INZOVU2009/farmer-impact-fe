import { toast } from "react-hot-toast";
import { getFarmersByGroup } from "../../../api/farmersApi";
import {
  farmersListFail,
  farmersListPending,
  farmersListSuccess,
} from "../../slices/farmers/fetchFarmerByGroupSlice";

export const fetchFarmersByGroupAction = (group, token) => async (dispatch) => {
  try {
    dispatch(farmersListPending());

    const res = await getFarmersByGroup(group, token);

    dispatch(farmersListSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(farmersListFail(error.message));
    }

    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(farmersListFail(error.Error));
  }
};
