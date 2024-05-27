import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  householdTrees: null,
  error: null,
  loading: false,
};
const fetchAllHouseholdTreesSlice = createSlice({
  name: "fetchAllHouseholdTrees",
  initialState,
  reducers: {
    householdTreesPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    householdTreesSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.householdTrees = action.payload;
    },
    householdTreesFail: (state, action) => {
      state.loading = false;
      state.householdTrees = null;
      state.error = action.payload;
    },
  },
});

export const {
  householdTreesPending,
  householdTreesSuccess,
  householdTreesFail,
} = fetchAllHouseholdTreesSlice.actions;
export default fetchAllHouseholdTreesSlice.reducer;
