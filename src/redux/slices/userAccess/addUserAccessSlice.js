import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access: null,
  error: null,
  loading: false,
};
const userAccessSlice = createSlice({
  name: "userAccess",
  initialState,
  reducers: {
    accessPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    accessSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.access = action.payload;
    },
    accessFail: (state, action) => {
      state.loading = false;
      state.access = null;
      state.error = action.payload;
    },
  },
});

export const { accessPending, accessSuccess, accessFail } =
  userAccessSlice.actions;
export default userAccessSlice.reducer;
