
import { toast } from 'react-toastify';

import { addFail, addPending, addSuccess } from '../../slices/untraceableCoffee/untraceableCoffeeSlice';
import { untraceableCoffee } from '../../../api/untraceableCoffeeApi';
export const addUntraceableCoffee= (data,token) => async (dispatch) => {
    try {
      dispatch(addPending());
    

      const res = await untraceableCoffee(data,token);
      console.log("res",res)
      dispatch(addSuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
      console.log("err",error)

        toast.error(`${error.message} `);
        return dispatch(addFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr",error)

      return dispatch(addFail(error.Error));
    }
  };