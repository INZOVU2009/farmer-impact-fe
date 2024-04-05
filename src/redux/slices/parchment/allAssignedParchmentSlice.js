import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	allParchments: null,
	error: null,
	loading: false,	
};
const fetchAllAssignedParchmentsSlice = createSlice({
	name: 'allAssignedParchments',
	initialState,
	reducers: {
	fetchPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.allParchments = action.payload;
		},
		fetchFail: (state, action) => {
		state.loading = false;
			state.allParchments = null;
			state.error = action.payload;
		},
	
	},
});

export const { fetchPending, fetchSuccess, fetchFail} =
    fetchAllAssignedParchmentsSlice.actions;
export default fetchAllAssignedParchmentsSlice.reducer;