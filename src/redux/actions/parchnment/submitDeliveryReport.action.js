
import {toast} from "react-hot-toast";
import { deliverParchment } from '../../../api/parchmentApi';
import { deliveryFail, deliveryPending, deliverySuccess } from '../../slices/parchment/deliveryReportSlice';

export const submitDeliveryReport= (data,token) => async (dispatch) => {
    try {
      dispatch(deliveryPending());
    

      const res = await deliverParchment(data,token);
      dispatch(deliverySuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
        toast.error(`${error.message} `);
        return dispatch(deliveryFail(error.message));
      }
      toast.error(`${error.Error}`);
      return dispatch(deliveryFail(error.Error));
    }
  };