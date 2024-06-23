import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deletedAnswer: null,
  error: null,
  loading: false,
};
const deleteInspectionAnswerSlice = createSlice({
  name: "deleteInspectionAnswer",
  initialState,
  reducers: {
    deletedAnswerPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletedAnswerSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.deletedAnswer = action.payload;
    },
    deletedAnswerFail: (state, action) => {
      state.loading = false;
      state.deletedAnswer = null;
      state.error = action.payload;
    },
  },
});

export const { deletedAnswerPending, deletedAnswerSuccess, deletedAnswerFail } =
  deleteInspectionAnswerSlice.actions;
export default deleteInspectionAnswerSlice.reducer;
