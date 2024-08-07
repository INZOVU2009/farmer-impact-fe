import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	update: null,
	error: null,
	loading: false,	
};
const updateBucketSlice = createSlice({
	name: 'updateBucket',
	initialState,
	reducers: {
	updatePending: (state) => {
			state.loading = true;
			state.error = null;
		},
		updateSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.update = action.payload;
		},
		updateFail: (state, action) => {
		state.loading = false;
			state.update = null;
			state.error = action.payload;
		},
	
	},
});

export const { updatePending, updateSuccess, updateFail} =
updateBucketSlice.actions;
export default updateBucketSlice.reducer;