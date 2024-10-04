import {
    fetchPending,
    fetchFail,
    fetchSuccess,
  } from "../../slices/supplier/allSupplierSlice";
  import { AllSuppliers } from "../../../api/supplierInventoryApi";
  export const fetchAllSuppliers = () => async (dispatch) => {
    try {
      dispatch(fetchPending());
      const res = await AllSuppliers();
  
      dispatch(fetchSuccess(res));
      //console.log(res);
    return res;
    
    } catch (error) {
      if (error) {
        return dispatch(fetchFail(error.message));
      }
      return dispatch(fetchFail(error.Error));
    }
  };
  