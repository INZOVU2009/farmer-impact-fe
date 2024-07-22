import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  proceed: null,
  error: null,
  loading: false,
};
const proceedRegistrationSlice = createSlice({
  name: "proceedRegistration",
  initialState,
  reducers: {
    proceedPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    proceedSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.proceed = action.payload;
    },
    proceedFail: (state, action) => {
      state.loading = false;
      state.proceed = null;
      state.error = action.payload;
    },
  },
});

export const { proceedPending, proceedSuccess, proceedFail } =
proceedRegistrationSlice.actions;
export default proceedRegistrationSlice.reducer;
