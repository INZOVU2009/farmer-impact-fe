import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    singleReport:null,
	error: null,
	loading: false,
};
const fetchSingleReportSlice = createSlice({
	name: 'fetchSingleReport',
	initialState,
	reducers: {
        singleReportPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		singleReportSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.singleReport = action.payload;
		},
		singleReportFail: (state, action) => {
		state.loading = false;
			state.singleReport = null;
			state.error = action.payload;
		},
	
	},
});

export const { singleReportPending, singleReportSuccess, singleReportFail} =
fetchSingleReportSlice.actions;
export default fetchSingleReportSlice.reducer;