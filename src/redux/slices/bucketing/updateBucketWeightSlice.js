import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	updateWeight: null,
	error: null,
	loading: false,	
};
const updateBucketWeightSlice = createSlice({
	name: 'updateBucketWeight',
	initialState,
	reducers: {
	updateWeightPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		updateWeightSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.updateWeight = action.payload;
		},
		updateWeightFail: (state, action) => {
		state.loading = false;
			state.updateWeight = null;
			state.error = action.payload;
		},
	
	},
});

export const { updateWeightPending, updateWeightSuccess, updateWeightFail} =
updateBucketWeightSlice.actions;
export default updateBucketWeightSlice.reducer;