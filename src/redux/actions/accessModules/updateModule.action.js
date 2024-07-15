/* eslint-disable */
import {toast} from "react-hot-toast";
import { updateModule } from "../../../api/accessModulesApi";
import {
  updateFail,
  updatePending,
  updateSuccess,
} from "../../slices/accessModules/updateModuleSlice";

export const updateModuleName = (data, id) => async (dispatch) => {
  try {
    dispatch(updatePending());
    const res = await updateModule(data, id);
    dispatch(updateSuccess(res));
    toast.success(res.message);
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(updateFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(updateFail(error.Error));
  }
};
