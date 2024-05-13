import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    inspections:null,
	error: null,
	loading: false,
};
const fetchAllInspectionsSlice = createSlice({
	name: 'fetchAllInspections',
	initialState,
	reducers: {
       inspectionsPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		inspectionsSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.inspections = action.payload;
		},
	    inspectionsFail: (state, action) => {
		state.loading = false;
			state.inspections = null;
			state.error = action.payload;
		},
	
	},
});

export const { inspectionsPending, inspectionsSuccess, inspectionsFail} =
fetchAllInspectionsSlice.actions;
export default fetchAllInspectionsSlice.reducer;