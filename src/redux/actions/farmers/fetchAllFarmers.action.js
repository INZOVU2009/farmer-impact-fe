import { toast } from "react-toastify";
import {
  farmersFail,
  farmersPending,
  farmersSuccess,
} from "../../slices/farmers/fetchAllFarmersSlice";
import { getAllFarmers } from "../../../api/farmersApi";

export const fetchAllFarmers = () => async (dispatch) => {
  try {
    dispatch(farmersPending());

    const res = await getAllFarmers();

    dispatch(farmersSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(farmersFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(farmersFail(error.Error));
  }
};
