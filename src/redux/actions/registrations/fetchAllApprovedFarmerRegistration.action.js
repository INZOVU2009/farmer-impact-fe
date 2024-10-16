import { toast } from "react-hot-toast";
import { getApprovedRegistrations } from "../../../api/registersApi";
import {
  approvedRegistrationsFailed,
  approvedRegistrationsPending,
  approvedRegistrationsSuccess,
} from "../../slices/registrations/fetchApprovedRegistrationSlice";

export const fetchApprovedFarmerRegistrations =
  (currentPage, itemsPerPage, token) => async (dispatch) => {
    try {
      dispatch(approvedRegistrationsPending());

      const res = await getApprovedRegistrations(
        currentPage,
        itemsPerPage,
        token
      );
      dispatch(approvedRegistrationsSuccess(res));
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message}`);
        return dispatch(approvedRegistrationsFailed(error.message));
      }
      toast.error(`${error.Error}`);
      return dispatch(approvedRegistrationsFailed(error.Error));
    }
  };
