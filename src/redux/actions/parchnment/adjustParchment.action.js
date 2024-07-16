
import {toast} from "react-hot-toast";
import {  parchmentAdjustment } from '../../../api/parchmentApi';
import { adjustFail, adjustPending, adjustSuccess } from '../../slices/parchment/adjustParchmentSlice';

export const adjustParchment= (data) => async (dispatch) => {
    try {
      dispatch(adjustPending());

      const res = await parchmentAdjustment(data);
      console.log("res",res)
      dispatch(adjustSuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
      console.log("err",error)

        toast.error(`${error.message} `);
        return dispatch(adjustFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr",error)

      return dispatch(adjustFail(error.Error));
    }
  };