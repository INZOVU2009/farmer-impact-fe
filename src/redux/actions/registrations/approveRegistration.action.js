import { toast } from "react-hot-toast";
import { approveRegistration } from "../../../api/registersApi";
import {
  approveFail,
  approvePending,
  approveSuccess,
} from "../../slices/registrations/approveRegistrationSlice";

export const approveVerifiedRegistration = (id) => async (dispatch) => {
  try {
    dispatch(approvePending());
    const res = await approveRegistration(id);
    toast.success(res.message);
    dispatch(approveSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(approveFail(error.message));
    }
    toast.error(`${error.Error} `);
    return dispatch(approveFail(error.Error));
  }
};
