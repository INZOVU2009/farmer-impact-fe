import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  householdTrees: null,
  error: null,
  loading: false,
};
const fetchAllTreeServeySlice = createSlice({
  name: "fetchAllTrees",
  initialState,
  reducers: {
    TreesPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    TreesSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.householdTrees = action.payload;
    },
    TreesFail: (state, action) => {
      state.loading = false;
      state.householdTrees = null;
      state.error = action.payload;
    },
  },
});

export const {
  TreesPending,
  TreesSuccess,
  TreesFail,
} = fetchAllTreeServeySlice.actions;
export default fetchAllTreeServeySlice.reducer;
