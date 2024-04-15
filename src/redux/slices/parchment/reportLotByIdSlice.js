import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lot:null,
	error: null,
	loading: false,
};
const fetchReportLotByIdSlice = createSlice({
	name: 'fetchReportLotById',
	initialState,
	reducers: {
        reportLotPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		reportLotSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.lot = action.payload;
		},
		reportLotFail: (state, action) => {
		state.loading = false;
			state.lot = null;
			state.error = action.payload;
		},
	
	},
});

export const { reportLotPending, reportLotSuccess, reportLotFail} =
fetchReportLotByIdSlice.actions;
export default fetchReportLotByIdSlice.reducer;