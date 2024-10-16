import { toast } from "react-hot-toast";
import { proceedRegistrations } from "../../../api/registersApi";

import {
  proceedFail,
  proceedPending,
  proceedSuccess,
} from "../../slices/registrations/proceedRegistrationsSlice";

export const proceedApprovedRegistrations = () => async (dispatch) => {
  try {
    dispatch(proceedPending());
    const res = await proceedRegistrations();
    toast.success(res.message);
    dispatch(proceedSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(proceedFail(error.message));
    }
    toast.error(`${error.Error} `);
    return dispatch(proceedFail(error.Error));
  }
};
