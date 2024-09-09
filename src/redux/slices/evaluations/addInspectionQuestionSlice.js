import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: null,
  error: null,
  loading: false,
};
const addNewInspectionQuestionSlice = createSlice({
  name: "addNewInspectionQuestion",
  initialState,
  reducers: {
    questionPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    questionSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.question = action.payload;
    },
    questionFail: (state, action) => {
      state.loading = false;
      state.question = null;
      state.error = action.payload;
    },
  },
});

export const { questionPending, questionSuccess, questionFail } =
addNewInspectionQuestionSlice.actions;
export default addNewInspectionQuestionSlice.reducer;
