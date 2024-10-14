import { toast } from "react-hot-toast";
import { getVerifiedRegistrations } from "../../../api/registersApi";
import {
  verifiedRegistrationsFailed,
  verifiedRegistrationsPending,
  verifiedRegistrationsSuccess,
} from "../../slices/registrations/fetchVerifiedRegistrationsSlice";

export const fetchVerifiedFarmerRegistrations =
  (currentPage, itemsPerPage, token) => async (dispatch) => {
    try {
      dispatch(verifiedRegistrationsPending());

      const res = await getVerifiedRegistrations(
        currentPage,
        itemsPerPage,
        token
      );
      dispatch(verifiedRegistrationsSuccess(res));
      console.log(res);
      //   toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message}`);
        return dispatch(verifiedRegistrationsFailed(error.message));
      }
      toast.error(`${error.Error}`);
      return dispatch(verifiedRegistrationsFailed(error.Error));
    }
  };
