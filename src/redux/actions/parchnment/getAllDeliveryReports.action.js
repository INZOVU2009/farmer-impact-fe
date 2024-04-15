import { deliveryReports } from "../../../api/parchmentApi";
import { deliveryReportsFail, deliveryReportsPending, deliveryReportsSuccess } from "../../slices/parchment/getAllDeliveryReportsSlice";


export const fetchAllDeliveryReports = () => async (dispatch) => {
    try {
     
      dispatch(deliveryReportsPending());
      const res = await deliveryReports();
      
      dispatch(deliveryReportsSuccess(res));
      toast.success(res.message);
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