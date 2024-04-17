import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    updatedBucket:null,
	error: null,
	isloading: false,
	
};
const updateTransactionBucket = createSlice({
	name: 'updateTransactionBucket',
	initialState,
	reducers: {
        updateBucketPending: (state) => {
			state.isloading = true;
			state.error = null;
		},
		updateBucketSuccess: (state, action) => {
			state.isloading = false;
			state.error = null;
			state.updatedBucket = action.payload;
		},
		updateBucketFail: (state, action) => {
		state.isloading = false;
			state.updatedBucket= null;
			state.error = action.payload;
		},
	
	},
});

export const { updateBucketPending, updateBucketSuccess, updateBucketFail} =
updateTransactionBucket.actions;
export default updateTransactionBucket.reducer;