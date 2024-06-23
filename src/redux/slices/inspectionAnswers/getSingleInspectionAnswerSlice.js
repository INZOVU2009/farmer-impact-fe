import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answer: null,
  error: null,
  loading: false,
};
const getInspectionAnswerSlice = createSlice({
  name: "getInspectionAnswer",
  initialState,
  reducers: {
    answerPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    answerSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.answer = action.payload;
    },
    answerFail: (state, action) => {
      state.loading = false;
      state.answer = null;
      state.error = action.payload;
    },
  },
});

export const { answerPending, answerSuccess, answerFail } =
  getInspectionAnswerSlice.actions;
export default getInspectionAnswerSlice.reducer;
