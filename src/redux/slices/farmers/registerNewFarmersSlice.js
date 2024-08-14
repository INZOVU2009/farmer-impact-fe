import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  register: null,
  error: null,
  loading: false,
};
const registerNewFarmersSlice = createSlice({
  name: "registerNewFarmers",
  initialState,
  reducers: {
    registerPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.register = action.payload;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.register = null;
      state.error = action.payload;
    },
  },
});

export const { registerPending, registerSuccess, registerFail } =
registerNewFarmersSlice.actions;
export default registerNewFarmersSlice.reducer;
