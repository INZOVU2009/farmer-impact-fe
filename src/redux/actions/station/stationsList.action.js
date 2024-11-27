import { getStationsList } from "../../../api/stationApi";
import {
  listFail,
  listPending,
  listSuccess,
} from "../../slices/station/stationsListSlice";

export const stationsListAction = (token) => async (dispatch) => {
  try {
    dispatch(listPending());
    const res = await getStationsList(token);

    dispatch(listSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      return dispatch(listFail(error.message));
    }
    return dispatch(fetchFail(error.Error));
  }
};
