/* eslint-disable */
import { toast } from "react-toastify";
import { getAssignedModulesToSingleUser } from "../../../api/accessModulesApi";

import {
  assignedModulesListFail,
  assignedModulesListPending,
  assignedModulesListSuccess,
} from "../../slices/accessModules/getAssignedModulesForSingleUserSlice";

export const assignedModulesForSingleUser = (id) => async (dispatch) => {
  try {
    dispatch(assignedModulesListPending());
    const res = await getAssignedModulesToSingleUser(id);

    dispatch(assignedModulesListSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(assignedModulesListFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(assignedModulesListFail(error.Error));
  }
};
