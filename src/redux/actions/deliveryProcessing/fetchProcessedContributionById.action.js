
import {toast} from "react-hot-toast";
import {  getProcessedContributionsById } from "../../../api/deliveryProcessingApi";
import { fetchFail, fetchPending, fetchSUccess } from "../../slices/deliveryProcessing/fetchProcessedContributionByIdSlice";
  
  export const fetchProcessedContribution = (id) => async (dispatch) => {
    try {
        dispatch(fetchPending());
        const res = await getProcessedContributionsById(id);
    
        dispatch(fetchSUccess(res));
        toast.success(res.message);
        return res;
      } catch (error) {
        if (error) {
          console.log("err", error);
    
          toast.error(`${error.message} `);
          console.log("errrrr", error.message);
          return dispatch(fetchFail(error.message));
        }
        toast.error(`${error.Error}`);
        console.log("errrr", error);
        return dispatch(fetchFail(error.Error));
      }
  
  };
  


 
  