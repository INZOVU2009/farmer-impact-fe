import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activate: null,
  error: null,
  loading: false,
};
const activateUserSlice = createSlice({
  name: "activateUser",
  initialState,
  reducers: {
    activatePending: (state) => {
      state.loading = true;
      state.error = null;
    },
    activateSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.activate = action.payload;
    },
    activateFail: (state, action) => {
      state.loading = false;
      state.activate = null;
      state.error = action.payload;
    },
  },
});

export const { activatePending, activateSuccess, activateFail } =
  activateUserSlice.actions;
export default activateUserSlice.reducer;
