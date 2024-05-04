
import { toast } from 'react-toastify';
import { updateDeliveryReport } from "../../../api/parchmentApi";
import { updateFail, updatePending, updateSuccess } from '../../slices/parchment/updateDeliveryReportSlice';

export const updateReport= (data,id,token) => async (dispatch) => {
    try {
      dispatch(updatePending());
    

      const res = await updateDeliveryReport(data,id,token);
      console.log("res",res)
      dispatch(updateSuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
      console.log("err",error)

        toast.error(`${error.message} `);
        return dispatch(updateFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr",error)

      return dispatch(updateFail(error.Error));
    }
  };