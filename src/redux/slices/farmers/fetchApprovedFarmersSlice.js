import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  approvedFarmers: null,
  error: null,
  loading: false,
};
const fetchAllApprovedFarmersSlice = createSlice({
  name: "fetchAllApprovedFarmers",
  initialState,
  reducers: {
    approvedFarmersPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    approvedFarmersSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.approvedFarmers = action.payload;
    },
    approvedFarmersFail: (state, action) => {
      state.loading = false;
      state.approvedFarmers = null;
      state.error = action.payload;
    },
  },
});

export const {
  approvedFarmersPending,
  approvedFarmersSuccess,
  approvedFarmersFail,
} = fetchAllApprovedFarmersSlice.actions;
export default fetchAllApprovedFarmersSlice.reducer;
