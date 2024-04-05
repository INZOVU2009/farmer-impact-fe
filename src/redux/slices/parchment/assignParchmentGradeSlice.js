import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    parchmentGrade:null,
	error: null,
	isloading: false,
	
};
const assignNewParchmentGradeSlice = createSlice({
	name: 'newParchmentGrade',
	initialState,
	reducers: {
        assignPending: (state) => {
			state.isloading = true;
			state.error = null;
		},
		assignSuccess: (state, action) => {
			state.isloading = false;
			state.error = null;
			state.parchmentGrade= action.payload;
		},
		assignFail: (state, action) => {
		state.isloading = false;
			state.parchmentGrade= null;
			state.error = action.payload;
		},
	
	},
});

export const { assignPending, assignSuccess, assignFail} =
assignNewParchmentGradeSlice.actions;
export default assignNewParchmentGradeSlice.reducer;