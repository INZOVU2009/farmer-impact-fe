import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    create:null,
	error: null,
	loading: false,
	
};
const createModuleSlice = createSlice({
	name: 'createModule',
	initialState,
	reducers: {
        createPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		createSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.create= action.payload;
		},
		createFail: (state, action) => {
		state.loading = false;
			state.create= null;
			state.error = action.payload;
		},
	
	},
});

export const { createPending, createSuccess, createFail} =
createModuleSlice.actions;
export default createModuleSlice.reducer;