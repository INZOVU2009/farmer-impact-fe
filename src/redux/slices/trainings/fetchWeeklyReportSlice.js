import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    weeklyReport:null,
	error: null,
	loading: false,
};
const fetchWeeklyReportSlice = createSlice({
	name: 'fetchWeeklyReport',
	initialState,
	reducers: {
       weeklyReportPending: (state) => {
			state.loading = true;
			state.error = null;
		},
	weeklyReportSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.weeklyReport = action.payload;
		},
	    weeklyReportFail: (state, action) => {
		state.loading = false;
			state.weeklyReport = null;
			state.error = action.payload;
		},
	
	},
});

export const { weeklyReportPending, weeklyReportSuccess, weeklyReportFail} =
fetchWeeklyReportSlice.actions;
export default fetchWeeklyReportSlice.reducer;