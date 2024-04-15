import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    adjustment:null,
	error: null,
	isloading: false,
	
};
const adjustParchmentSlice = createSlice({
	name: 'adjustParchment',
	initialState,
	reducers: {
        adjustPending: (state) => {
			state.isloading = true;
			state.error = null;
		},
		adjustSuccess: (state, action) => {
			state.isloading = false;
			state.error = null;
			state.adjustment= action.payload;
		},
		adjustFail: (state, action) => {
		state.isloading = false;
			state.adjustment= null;
			state.error = action.payload;
		},
	
	},
});

export const { adjustPending, adjustSuccess, adjustFail} =
adjustParchmentSlice.actions;
export default adjustParchmentSlice.reducer;