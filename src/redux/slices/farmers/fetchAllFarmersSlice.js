import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  farmers: null,
  error: null,
  loading: false,
};
const fetchAllFarmersSlice = createSlice({
  name: "fetchAllFarmers",
  initialState,
  reducers: {
    farmersPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    farmersSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.farmers = action.payload;
    },
    farmersFail: (state, action) => {
      state.loading = false;
      state.farmers = null;
      state.error = action.payload;
    },
  },
});

export const { farmersPending, farmersSuccess, farmersFail } =
  fetchAllFarmersSlice.actions;
export default fetchAllFarmersSlice.reducer;
