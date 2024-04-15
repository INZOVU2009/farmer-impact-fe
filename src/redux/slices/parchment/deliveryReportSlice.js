import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    delivery:null,
	error: null,
	isloading: false,
	
};
const submitDeliveryReportSlice = createSlice({
	name: 'deliveryReport',
	initialState,
	reducers: {
        deliveryPending: (state) => {
			state.isloading = true;
			state.error = null;
		},
		deliverySuccess: (state, action) => {
			state.isloading = false;
			state.error = null;
			state.delivery= action.payload;
		},
		deliveryFail: (state, action) => {
		state.isloading = false;
			state.delivery= null;
			state.error = action.payload;
		},
	
	},
});

export const { deliveryPending, deliverySuccess, deliveryFail} =
submitDeliveryReportSlice.actions;
export default submitDeliveryReportSlice.reducer;