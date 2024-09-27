import { toast } from "react-hot-toast";
import {
  registrationsFailed,
  registrationsPending,
  registrationsSuccess,
} from "../../slices/registrations/fetchAllFarmerRegistrationSlice";
import { getFarmerRegistrations } from "../../../api/registersApi";

export const fetchFarmerRegistrations =
  (currentPage, itemsPerPage, token, status) => async (dispatch) => {
    try {
      dispatch(registrationsPending());

      const res = await getFarmerRegistrations(
        currentPage,
        itemsPerPage,
        token,
        status
      );
      dispatch(registrationsSuccess(res));
      console.log(res);
      //   toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message}`);
        return dispatch(registrationsFailed(error.message));
      }
      toast.error(`${error.Error}`);
      return dispatch(registrationsFailed(error.Error));
    }
  };
