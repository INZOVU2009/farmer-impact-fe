import { deliveryReports } from "../../../api/parchmentApi";
import {
  deliveryReportsFail,
  deliveryReportsPending,
  deliveryReportsSuccess,
} from "../../slices/parchment/getAllDeliveryReportsSlice";
import { toast } from "react-hot-toast";

export const fetchAllDeliveryReports = (token) => async (dispatch) => {
  try {
    dispatch(deliveryReportsPending());
    const res = await deliveryReports(token);
    dispatch(deliveryReportsSuccess(res));
    // toast.success(res.message);
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message} `);
      return dispatch(deliveryReportsFail(error.message));
    }
    toast.error(`${error.Error}`);
    return dispatch(deliveryReportsFail(error.Error));
  }
};
