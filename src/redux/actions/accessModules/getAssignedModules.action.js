/* eslint-disable */
import { toast } from "react-toastify";
import { getAssignedModules } from "../../../api/accessModulesApi";
import {
  assignedModulesFail,
  assignedModulesPending,
  assignedModulesSuccess,
} from "../../slices/accessModules/getAssignedModulesSlice";

export const assignedModules = (token) => async (dispatch) => {
  try {
    dispatch(assignedModulesPending());
    const res = await getAssignedModules(token);

    dispatch(assignedModulesSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(assignedModulesFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(assignedModulesFail(error.Error));
  }
};
