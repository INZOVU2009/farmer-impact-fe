import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trainings:null,
	error: null,
	loading: false,
};
const fetchAllTrainingsSlice = createSlice({
	name: 'fetchAllTrainings',
	initialState,
	reducers: {
       trainingsPending: (state) => {
			state.loading = true;
			state.error = null;
		},
		trainingsSuccess: (state, action) => {
			state.loading = false;
			state.error = null;
			state.trainings = action.payload;
		},
	    trainingsFail: (state, action) => {
		state.loading = false;
			state.trainings = null;
			state.error = action.payload;
		},
	
	},
});

export const { trainingsPending, trainingsSuccess, trainingsFail} =
fetchAllTrainingsSlice.actions;
export default fetchAllTrainingsSlice.reducer;