import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contribution:null,
	error: null,
	loading: false,
};
const fetchProcessedContributionSlice = createSlice({
	name: 'processedContributionById',
	initialState,
	reducers: {
       fetchPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchSUccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.contribution = action.payload;
		},
	    fetchFail: (state, action) => {
		state.loading = false;
			state.contribution = null;
			state.error = action.payload;
		},
	
	},
});

export const { fetchPending, fetchSUccess, fetchFail} =
fetchProcessedContributionSlice.actions;
export default fetchProcessedContributionSlice.reducer;