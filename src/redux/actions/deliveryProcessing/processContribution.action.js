
import { toast } from 'react-toastify';
import { processingFail, processingPending, processingSuccess } from '../../slices/deliveryProcessing/processingContributionSlice';
import { processContributions } from '../../../api/deliveryProcessingApi';

export const processContribution= (data) => async (dispatch) => {
    try {
      dispatch(processingPending());
    
      const res = await processContributions(data);
      console.log("res data ",res)
      dispatch(processingSuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
      console.log("err",error)

        toast.error(`${error.message} `);
        return dispatch(processingFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr",error)

      return dispatch(processingFail(error.Error));
    }
  };