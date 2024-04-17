import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    updatedBucketWeight:null,
	error: null,
	isloading: false,
	
};
const updateTransactionBucketWeight = createSlice({
	name: 'updateTransactionBucketWeight',
	initialState,
	reducers: {
        updateBucketWeightPending: (state) => {
			state.isloading = true;
			state.error = null;
		},
		updateBucketWeightSuccess: (state, action) => {
			state.isloading = false;
			state.error = null;
			state.updatedBucketWeight = action.payload;
		},
		updateBucketWeightFail: (state, action) => {
		state.isloading = false;
			state.updatedBucketWeight= null;
			state.error = action.payload;
		},
	
	},
});

export const { updateBucketWeightPending, updateBucketWeightSuccess, updateBucketWeightFail} =
updateTransactionBucketWeight.actions;
export default updateTransactionBucketWeight.reducer;