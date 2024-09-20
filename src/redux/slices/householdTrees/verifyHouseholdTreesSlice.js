import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  verify: null,
  error: null,
  loading: false,
};
const verifyHouseholdTreesSlice = createSlice({
  name: "verifyHouseholdTrees",
  initialState,
  reducers: {
    verifyPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    verifySuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.verify = action.payload;
    },
    verifyFail: (state, action) => {
      state.loading = false;
      state.verify = null;
      state.error = action.payload;
    },
  },
});

export const { verifyPending, verifySuccess, verifyFail } =
verifyHouseholdTreesSlice.actions;
export default verifyHouseholdTreesSlice.reducer;
