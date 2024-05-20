import { toast } from "react-toastify";
import {
  inspectionsFail,
  inspectionsPending,
  inspectionsSuccess,
} from "../../slices/inspections/fetchInspectionsSlice";
import { getAllUsersInspections } from "../../../api/inspectionsApi";

export const fetchAllInspections = () => async (dispatch) => {
  try {
    dispatch(inspectionsPending());
    const res = await getAllUsersInspections();
    dispatch(inspectionsSuccess(res));

    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      console.log("errrrr", error.message);
      return dispatch(inspectionsFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);
    return dispatch(inspectionsFail(error.Error));
  }
};
