import {  
    FarmerPending,
    FarmerSuccess,
    FarmerFailed
 } from '../../slices/farmers/all_field_farmerSlice'

import { getRecentFarmer } from '../../../api/recentFarmersApi'
import { toast } from 'react-toastify'

export const fetchFieldFarmers = (data) => async (dispatch) =>{
    try {
        dispatch(FarmerPending());

        const res = await getRecentFarmer(data);
        dispatch(FarmerSuccess(res));
        console.log(res);
        toast.success(res.message);
        return res;
    } catch (error) {
        if(error){
            toast.error(`${error.message}`);
            return dispatch(FarmerFailed(error.message))
        }
        toast.error(`${error.Error}`);
        return dispatch(FarmerFailed(error.Error));
    }
};