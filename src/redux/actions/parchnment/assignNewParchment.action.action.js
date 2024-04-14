
import { toast } from 'react-toastify';
import { assignFail, assignPending, assignSuccess } from "../../slices/parchment/assignNewParchmetnSlice";
import { assignNewParchment } from "../../../api/parchmentApi";

export const assigParchment= (data) => async (dispatch) => {
    try {
      dispatch(assignPending());
    

      const res = await assignNewParchment(data);
      console.log("res",res)
      dispatch(assignSuccess(res));
      toast.success(res.message);
      return res;
    } catch (error) {
      if (error) {
      console.log("err",error)

        toast.error(`${error.message} `);
        return dispatch(assignFail(error.message));
      }
      toast.error(`${error.Error}`);
      console.log("errrr",error)

      return dispatch(assignFail(error.Error));
    }
  };