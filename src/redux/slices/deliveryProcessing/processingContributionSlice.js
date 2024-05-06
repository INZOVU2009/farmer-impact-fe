import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contributions:null,
	error: null,
	loading: false,
};
const processContributionSlice = createSlice({
	name: 'processContribution',
	initialState,
	reducers: {
       processingPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		processingSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.contributions = action.payload;
		},
	    processingFail: (state, action) => {
		state.loading = false;
		state.contributions = null;
		state.error = action.payload;
		},
	
	},
});

export const { processingPending, processingSuccess, processingFail} =
processContributionSlice.actions;
export default processContributionSlice.reducer;