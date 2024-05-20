
import { toast } from 'react-toastify';

import { addFail, addPending, addSuccess } from '../../slices/untraceableCoffee/untraceableCoffeeSlice';
import { untraceableCoffee } from '../../../api/untraceableCoffeeApi';
import { saveFail, savePending, saveSuccess } from '../../slices/submitCherry/saveCherryToSubmitSlice';
import { saveCherryToSubmit } from '../../../api/submitCherryApi';

export const saveCherry= (cherry_lot_id,data) => async (dispatch) => {
    try {
      dispatch(savePending());
    

      const res = await saveCherryToSubmit(cherry_lot_id,data);
      console.log("cherry_lot_id,data",cherry_lot_id,data)
      console.log("res",res)
      dispatch(saveSuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
      console.log("err",error)

        toast.error(`${error.message} `);
        return dispatch(saveFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr",error)

      return dispatch(saveFail(error.Error));
    }
  };