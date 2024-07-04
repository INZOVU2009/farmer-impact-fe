import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  approved: null,
  error: null,
  loading: false,
};
const approveApprovedFarmerSlice = createSlice({
  name: "approveApprovedFarmer",
  initialState,
  reducers: {
    approvedPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    approvedSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.approved = action.payload;
    },
    approveFail: (state, action) => {
      state.loading = false;
      state.approved = null;
      state.error = action.payload;
    },
  },
});

export const { approvedPending, approvedSuccess, approvedFail } =
  approveApprovedFarmerSlice.actions;
export default approveApprovedFarmerSlice.reducer;
