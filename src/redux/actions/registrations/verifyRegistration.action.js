import { toast } from "react-hot-toast";
import {
  verifyFail,
  verifyPending,
  verifySuccess,
} from "../../slices/registrations/verifyRegistrationSlice";
import { verifyRegistration } from "../../../api/registersApi";

export const verifyNewRegistration = (id) => async (dispatch) => {
  try {
    dispatch(verifyPending());
    const res = await verifyRegistration(id);
    toast.success(res.message);
    dispatch(verifySuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} || Something Went wrong `);
      return dispatch(verifyFail(error.message));
    }
    toast.error(`${error.Error} || Something Went wrong !!`);
    return dispatch(verifyFail(error.Error));
  }
};
