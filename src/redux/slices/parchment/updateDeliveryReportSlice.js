import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    updatedReport:null,
	error: null,
	isloading: false,
	
};
const updateDeliveryReportSlice = createSlice({
	name: 'updateDeliveryReport',
	initialState,
	reducers: {
        updatePending: (state) => {
			state.isloading = true;
			state.error = null;
		},
		updateSuccess: (state, action) => {
			state.isloading = false;
			state.error = null;
			state.updatedReport= action.payload;
		},
		updateFail: (state, action) => {
		state.isloading = false;
			state.updatedReport= null;
			state.error = action.payload;
		},
	
	},
});

export const { updatePending, updateSuccess, updateFail} =
updateDeliveryReportSlice.actions;
export default updateDeliveryReportSlice.reducer;