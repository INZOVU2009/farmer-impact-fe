/* eslint-disable */
import { toast } from "react-toastify";
import { createModule } from "../../../api/accessModulesApi";

import {
  createFail,
  createPending,
  createSuccess,
} from "../../slices/accessModules/createNewModuleSlice";

export const createNewModule = (data) => async (dispatch) => {
  try {
    dispatch(createPending());
    const res = await createModule(data);
    dispatch(createSuccess(res));
    toast.success(res.message);
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(createFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(createFail(error.Error));
  }
};
