import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    attendences:null,
	error: null,
	loading: false,
};
const fetchAllAttendencesSlice = createSlice({
	name: 'fetchAllAttendences',
	initialState,
	reducers: {
        attendencesPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		attendencesSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.attendences = action.payload;
		},
	    attendencesFail: (state, action) => {
		state.loading = false;
			state.attendences = null;
			state.error = action.payload;
		},
	
	},
});

export const { attendencesPending, attendencesSuccess, attendencesFail} =
fetchAllAttendencesSlice.actions;
export default fetchAllAttendencesSlice.reducer;