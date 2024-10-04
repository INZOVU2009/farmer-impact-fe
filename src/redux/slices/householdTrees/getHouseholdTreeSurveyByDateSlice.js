import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  surveyByDate: null,
  error: null,
  loading: false,
};
const getHouseholdTreeSurveyByDateSlice = createSlice({
  name: "getHouseholdTreeSurveyByDate",
  initialState,
  reducers: {
    surveyByDatePending: (state) => {
      state.loading = true;
      state.error = null;
    },
    surveyByDateSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.surveyByDate = action.payload;
    },
    surveyByDateFail: (state, action) => {
      state.loading = false;
      state.surveyByDate = null;
      state.error = action.payload;
    },
  },
});

export const { surveyByDatePending, surveyByDateSuccess, surveyByDateFail } =
  getHouseholdTreeSurveyByDateSlice.actions;
export default getHouseholdTreeSurveyByDateSlice.reducer;
