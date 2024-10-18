import { toast } from "react-hot-toast";
import { deleteRegistration } from "../../../api/registersApi";
import {
  deleteFail,
  deletePending,
  deleteSuccess,
} from "../../slices/registrations/deleteRegistrationSlice";

export const deleteSingleRegistration = (id) => async (dispatch) => {
  try {
    dispatch(deletePending());
    const res = await deleteRegistration(id);
    toast.success(res.message);
    dispatch(deleteSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} || Something Went wrong `);
      return dispatch(deleteFail(error.message));
    }
    toast.error(`${error.Error} || Something Went wrong !!`);
    return dispatch(deleteFail(error.Error));
  }
};
