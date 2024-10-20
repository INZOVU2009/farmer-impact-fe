import { toast } from "react-hot-toast";
import {deleteHouseholdTree } from "../../../api/householdTreesApi";
import { deleteFail, deletePending, deleteSuccess } from "../../slices/householdTrees/deleteHouseholdTreesSlice";

export const deleteHouseholdTreeSurvey = (id) => async (dispatch) => {
  try {
    dispatch(deletePending());
    const res = await deleteHouseholdTree(id);
    toast.success(res.message);
    dispatch(deleteSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(deleteFail(error.message));
    }
    toast.error(`${error.Error} `);
    return dispatch(deleteFail(error.Error));
  }
};
