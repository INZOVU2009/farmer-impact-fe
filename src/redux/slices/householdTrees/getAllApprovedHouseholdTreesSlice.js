import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ApprovedHouseholdTrees: null,
  error: null,
  loading: false,
};
const fetchAllApprovedHouseholdTreesSlice = createSlice({
  name: "fetchAllApprovedHouseholdTrees",
  initialState,
  reducers: {
    ApprovedHouseholdTreesPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    ApprovedHouseholdTreesSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.ApprovedHouseholdTrees = action.payload;
    },
    ApprovedHouseholdTreesFail: (state, action) => {
      state.loading = false;
      state.ApprovedHouseholdTrees = null;
      state.error = action.payload;
    },
  },
});

export const {
  ApprovedHouseholdTreesPending,
  ApprovedHouseholdTreesSuccess,
  ApprovedHouseholdTreesFail,
} = fetchAllApprovedHouseholdTreesSlice.actions;
export default fetchAllApprovedHouseholdTreesSlice.reducer;
