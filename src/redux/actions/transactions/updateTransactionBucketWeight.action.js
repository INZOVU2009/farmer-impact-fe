
import { toast } from 'react-toastify';
import {updateTransactionBucketWeight } from '../../../api/coffeePurchaseApi';
import { updateBucketWeightFail, updateBucketWeightPending, updateBucketWeightSuccess } from '../../slices/transactions/updateTransactionBucketWeightSlice';

export const updateBucketWeight= (data) => async (dispatch) => {
    try {
      dispatch(updateBucketWeightPending());
    
      const res = await updateTransactionBucketWeight(data);
      console.log("res",res)
      dispatch(updateBucketWeightSuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
      console.log("err updating bucket Weight",error)

        toast.error(`${error.message} `);
        return dispatch(updateBucketWeightFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr updating bucket weight",error)

      return dispatch(updateBucketWeightFail(error.Error));
    }
  };