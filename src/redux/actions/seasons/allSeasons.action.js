import { toast } from "react-hot-toast";
import { getAllSeasons } from "../../../api/generalHarvestApi";
import {
  seasonsFail,
  seasonsPending,
  seasonsSuccess,
} from "../../slices/season/allSeasonSlice";

export const fetchAllSeasons = () => async (dispatch) => {
  try {
    dispatch(seasonsPending());

    const res = await getAllSeasons();
    // dispatch(seasonsSuccess(res));
    toast.success(res.message);
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);

      return dispatch(seasonsFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(seasonsFail(error.Error));
  }
};
