import {
  fetchPending,
  fetchFail,
  fetchSuccess,
} from "../../slices/station/allStationsSlice";
import { allStations } from "../../../api/stationApi";
export const fetchAllStation = () => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const res = await allStations();

    dispatch(fetchSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      return dispatch(fetchFail(error.message));
    }
    return dispatch(fetchFail(error.Error));
  }
};
