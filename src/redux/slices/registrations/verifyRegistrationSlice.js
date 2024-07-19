import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  verify: null,
  error: null,
  loading: false,
};
const verifyRegistrationSlice = createSlice({
  name: "verifyRegistration",
  initialState,
  reducers: {
    verifyPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    verifySuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.verify = action.payload;
    },
    verifyFail: (state, action) => {
      state.loading = false;
      state.verify = null;
      state.error = action.payload;
    },
  },
});

export const { verifyPending, verifySuccess, verifyFail } =
verifyRegistrationSlice.actions;
export default verifyRegistrationSlice.reducer;
