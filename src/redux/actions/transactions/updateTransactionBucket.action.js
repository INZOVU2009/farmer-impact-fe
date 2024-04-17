
import { toast } from 'react-toastify';
import { updateBucketPending, updateBucketSuccess, updateBucketFail } from '../../slices/transactions/updateTransactionBucketSlice';
import { updateTransactionBucket } from '../../../api/coffeePurchaseApi';

export const updateBucket= (data) => async (dispatch) => {
    try {
      dispatch(updateBucketPending());
    
      const res = await updateTransactionBucket(data);
      console.log("res",res)
      dispatch(updateBucketSuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
      console.log("err updating bucket",error)

        toast.error(`${error.message} `);
        return dispatch(updateBucketFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr updating bucket",error)

      return dispatch(updateBucketFail(error.Error));
    }
  };