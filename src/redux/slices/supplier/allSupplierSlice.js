import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	Suppliers: [],
	error: null,
	loading: false,	
};
const fetchAllSuppliersSlice = createSlice({
	name: 'Suppliers',
	initialState,
	reducers: {
	fetchPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.Suppliers = action.payload;
		},
		fetchFail: (state, action) => {
		state.loading = false;
			state.Suppliers = [];
			state.error = action.payload;
		},
	
	},
});

export const { fetchPending, fetchSuccess, fetchFail} =
    fetchAllSuppliersSlice.actions;
export default fetchAllSuppliersSlice.reducer;