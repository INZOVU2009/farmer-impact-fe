import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    report:null,
	error: null,
	loading: false,
};
const fetchReportByIdSlice = createSlice({
	name: 'fetchReportById',
	initialState,
	reducers: {
        fetchPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.report = action.payload;
		},
		fetchFail: (state, action) => {
		state.loading = false;
			state.report = null;
			state.error = action.payload;
		},
	
	},
});

export const { fetchPending, fetchSuccess, fetchFail} =
fetchReportByIdSlice.actions;
export default fetchReportByIdSlice.reducer;