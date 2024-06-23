import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newAnswer: null,
  error: null,
  loading: false,
};
const addNewInspectionAnswerSlice = createSlice({
  name: "addNewInspectionAnswer",
  initialState,
  reducers: {
    newAnswerPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    newAnswerSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.newAnswer = action.payload;
    },
    newAnswerFail: (state, action) => {
      state.loading = false;
      state.newAnswer = null;
      state.error = action.payload;
    },
  },
});

export const { newAnswerPending, newAnswerSuccess, newAnswerFail } =
  addNewInspectionAnswerSlice.actions;
export default addNewInspectionAnswerSlice.reducer;
