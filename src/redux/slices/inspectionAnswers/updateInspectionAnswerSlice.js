import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updatedAnswer: null,
  error: null,
  loading: false,
};
const updateInspectionAnswerSlice = createSlice({
  name: "updateInspectionAnswer",
  initialState,
  reducers: {
    updatedAnswerPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    updatedAnswerSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.updatedAnswer = action.payload;
    },
    updatedAnswerFail: (state, action) => {
      state.loading = false;
      state.updatedAnswer = null;
      state.error = action.payload;
    },
  },
});

export const { updatedAnswerPending, updatedAnswerSuccess, updatedAnswerFail } =
  updateInspectionAnswerSlice.actions;
export default updateInspectionAnswerSlice.reducer;
