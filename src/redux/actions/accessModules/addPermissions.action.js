import { toast } from "react-hot-toast";
import {
  permissionsFail,
  permissionsPending,
  permissionsSuccess,
} from "../../slices/accessModules/addPermissionsSlice";
import { addPermissions } from "../../../api/accessModulesApi";

export const assignPermission = (data) => async (dispatch) => {
  try {
    dispatch(permissionsPending());
    const res = await addPermissions(data);
    dispatch(permissionsSuccess(res));
    toast.success(res.message);
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(permissionsFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(permissionsFail(error.Error));
  }
};
