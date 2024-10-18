import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  VerifiedHouseholdTrees: null,
  error: null,
  loading: false,
};
const fetchAllVerifiedHouseholdTreesSlice = createSlice({
  name: "fetchAllVerifiedHouseholdTrees",
  initialState,
  reducers: {
    VerifiedHouseholdTreesPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    VerifiedHouseholdTreesSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.VerifiedHouseholdTrees = action.payload;
    },
    VerifiedHouseholdTreesFail: (state, action) => {
      state.loading = false;
      state.VerifiedHouseholdTrees = null;
      state.error = action.payload;
    },
  },
});

export const {
  VerifiedHouseholdTreesPending,
  VerifiedHouseholdTreesSuccess,
  VerifiedHouseholdTreesFail,
} = fetchAllVerifiedHouseholdTreesSlice.actions;
export default fetchAllVerifiedHouseholdTreesSlice.reducer;
