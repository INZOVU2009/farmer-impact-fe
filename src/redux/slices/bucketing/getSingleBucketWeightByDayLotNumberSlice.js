import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	bucket: null,
	error: null,
	loading: false,	
};
const getSingleBucketWeightByDayLotNumberSlice = createSlice({
	name: 'getSingleBucketWeightByDayLotNumber',
	initialState,
	reducers: {
	fetchPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.bucket = action.payload;
		},
		fetchFail: (state, action) => {
		state.loading = false;
			state.bucket = null;
			state.error = action.payload;
		},
	
	},
});

export const { fetchPending, fetchSuccess, fetchFail} =
getSingleBucketWeightByDayLotNumberSlice.actions;
export default getSingleBucketWeightByDayLotNumberSlice.reducer;