import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: null,
  loading: false,
};
const approveNewGroupSlice = createSlice({
  name: "approveNewGroup",
  initialState,
  reducers: {
    approvePending: (state) => {
      state.loading = true;
      state.error = null;
    },
    approveSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.response = action.payload;
    },
    approveFail: (state, action) => {
      state.loading = false;
      state.response = null;
      state.error = action.payload;
    },
    resetApproveGroupState(state, action) {
      state.response = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  approvePending,
  approveSuccess,
  approveFail,
  resetApproveGroupState,
} = approveNewGroupSlice.actions;
export default approveNewGroupSlice.reducer;
