import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    parchment:null,
	error: null,
	isloading: false,
	
};
const assignNewParchmentSlice = createSlice({
	name: 'newParchment',
	initialState,
	reducers: {
        assignPending: (state) => {
			state.isloading = true;
			state.error = null;
		},
		assignSuccess: (state, action) => {
			state.isloading = false;
			state.error = null;
			state.parchment = action.payload;
		},
		assignFail: (state, action) => {
		state.isloading = false;
			state.parchment= null;
			state.error = action.payload;
		},
	
	},
});

export const { assignPending, assignSuccess, assignFail} =
assignNewParchmentSlice.actions;
export default assignNewParchmentSlice.reducer;