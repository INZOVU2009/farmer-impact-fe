import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    untraceableCoffee:null,
	error: null,
	isloading: false,
	
};
const addUntraceableCoffeeSlice = createSlice({
	name: 'addUntraceableCoffee',
	initialState,
	reducers: {
        addPending: (state) => {
			state.isloading = true;
			state.error = null;
		},
		addSuccess: (state, action) => {
			state.isloading = false;
			state.error = null;
			state.untraceableCoffee= action.payload;
		},
		addFail: (state, action) => {
		state.isloading = false;
			state.untraceableCoffee= null;
			state.error = action.payload;
		},
	
	},
});

export const { addPending, addSuccess, addFail} =
addUntraceableCoffeeSlice.actions;
export default addUntraceableCoffeeSlice.reducer;