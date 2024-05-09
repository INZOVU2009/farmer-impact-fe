import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loadedWeights:null,
	error: null,
	loading: false,
};
const fetchloadedWeightByIdSlice = createSlice({
	name: 'fetchloadedWeightById',
	initialState,
	reducers: {
       loadedWeightPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		loadedWeightSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.loadedWeights = action.payload;
		},
	    loadedWeightFail: (state, action) => {
		state.loading = false;
			state.loadedWeights = null;
			state.error = action.payload;
		},
	
	},
});

export const { loadedWeightPending, loadedWeightSuccess, loadedWeightFail} =
fetchloadedWeightByIdSlice.actions;
export default fetchloadedWeightByIdSlice.reducer;