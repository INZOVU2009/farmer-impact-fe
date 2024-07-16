import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deactivate: null,
  error: null,
  loading: false,
};
const deactivateUserSlice = createSlice({
  name: "deactivateUser",
  initialState,
  reducers: {
    deactivatePending: (state) => {
      state.loading = true;
      state.error = null;
    },
    deactivateSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.deactivate = action.payload;
    },
    deactivateFail: (state, action) => {
      state.loading = false;
      state.deactivate = null;
      state.error = action.payload;
    },
  },
});

export const { deactivatePending, deactivateSuccess, deactivateFail } =
  deactivateUserSlice.actions;
export default deactivateUserSlice.reducer;
