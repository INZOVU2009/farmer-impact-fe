import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cherry:null,
	error: null,
	isloading: false,
	
};
const saveCherryToSubmitSlice = createSlice({
	name: 'saveCherryToSubmit',
	initialState,
	reducers: {
        savePending: (state) => {
			state.isloading = true;
			state.error = null;
		},
		saveSuccess: (state, action) => {
			state.isloading = false;
			state.error = null;
			state.cherry= action.payload;
		},
		saveFail: (state, action) => {
		state.isloading = false;
			state.cherry= null;
			state.error = action.payload;
		},
	
	},
});

export const { savePending, saveSuccess, saveFail} =
saveCherryToSubmitSlice.actions;
export default saveCherryToSubmitSlice.reducer;