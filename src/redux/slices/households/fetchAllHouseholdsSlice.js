import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  households: null,
  error: null,
  loading: false,
};
const fetchAllHouseholdsSlice = createSlice({
  name: "fetchAllHouseHolds",
  initialState,
  reducers: {
    householdsPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    householdsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.households = action.payload;
    },
    householdsFail: (state, action) => {
      state.loading = false;
      state.households = null;
      state.error = action.payload;
    },
  },
});

export const { householdsPending, householdsSuccess, householdsFail } =
fetchAllHouseholdsSlice.actions;
export default fetchAllHouseholdsSlice.reducer;
