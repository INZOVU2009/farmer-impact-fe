import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	deliveryReports: null,
	error: null,
	loading: false,	
};
const fetchAllDeliveryRepots = createSlice({
	name: 'allDeliveryReports',
	initialState,
	reducers: {
	deliveryReportsPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		deliveryReportsSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.deliveryReports = action.payload;
		},
		deliveryReportsFail: (state, action) => {
		state.loading = false;
			state.deliveryReports = null;
			state.error = action.payload;
		},
	
	},
});

export const { deliveryReportsPending, deliveryReportsSuccess, deliveryReportsFail} =
    fetchAllDeliveryRepots.actions;
export default fetchAllDeliveryRepots.reducer;