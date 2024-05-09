import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    processedContribution:null,
	error: null,
	loading: false,
};
const fetchProcessedContributions = createSlice({
	name: 'processedContributions',
	initialState,
	reducers: {
       contributionsPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		contributionsSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.processedContribution = action.payload;
		},
	    contributionsFail: (state, action) => {
		state.loading = false;
			state.processedContribution = null;
			state.error = action.payload;
		},
	
	},
});

export const { contributionsPending, contributionsSuccess, contributionsFail} =
fetchProcessedContributions.actions;
export default fetchProcessedContributions.reducer;