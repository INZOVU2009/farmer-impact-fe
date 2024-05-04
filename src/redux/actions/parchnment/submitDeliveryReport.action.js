
import { toast } from 'react-toastify';
import { deliverParchment } from '../../../api/parchmentApi';
import { deliveryFail, deliveryPending, deliverySuccess } from '../../slices/parchment/deliveryReportSlice';

export const submitDeliveryReport= (data,token) => async (dispatch) => {
    try {
      dispatch(deliveryPending());
    

      const res = await deliverParchment(data,token);
      console.log("res",res)
      dispatch(deliverySuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
      console.log("err",error)

        toast.error(`${error.message} `);
        return dispatch(deliveryFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr",error)

      return dispatch(deliveryFail(error.Error));
    }
  };