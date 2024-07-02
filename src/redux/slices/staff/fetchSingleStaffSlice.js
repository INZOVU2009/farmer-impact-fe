import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staff: null,
  error: null,
  loading: false,
};
const fetchSingleStaffSlice = createSlice({
  name: "fetchSingleStaff",
  initialState,
  reducers: {
    fetchPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.staff = action.payload;
    },
    fetchFail: (state, action) => {
      state.loading = false;
      state.staff = null;
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchFail } =
  fetchSingleStaffSlice.actions;
export default fetchSingleStaffSlice.reducer;
