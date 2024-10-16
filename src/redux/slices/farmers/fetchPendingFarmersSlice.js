import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingFarmers: null,
  error: null,
  loading: false,
};
const fetchAllPendingFarmersSlice = createSlice({
  name: "fetchAllPendingFarmers",
  initialState,
  reducers: {
    pendingFarmersPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    pendingFarmersSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.pendingFarmers = action.payload;
    },
    pendingFarmersFail: (state, action) => {
      state.loading = false;
      state.pendingFarmers = null;
      state.error = action.payload;
    },
  },
});

export const {
  pendingFarmersPending,
  pendingFarmersSuccess,
  pendingFarmersFail,
} = fetchAllPendingFarmersSlice.actions;
export default fetchAllPendingFarmersSlice.reducer;
