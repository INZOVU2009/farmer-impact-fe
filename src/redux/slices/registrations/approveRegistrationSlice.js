import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  approve: null,
  error: null,
  loading: false,
};
const approveRegistrationSlice = createSlice({
  name: "approveRegistration",
  initialState,
  reducers: {
    approvePending: (state) => {
      state.loading = true;
      state.error = null;
    },
    approveSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.approve = action.payload;
    },
    approveFail: (state, action) => {
      state.loading = false;
      state.approve = null;
      state.error = action.payload;
    },
  },
});

export const { approvePending, approveSuccess, approveFail } =
approveRegistrationSlice.actions;
export default approveRegistrationSlice.reducer;
