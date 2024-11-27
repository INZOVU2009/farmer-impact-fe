import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: null,
  loading: false,
};
const fetchFarmerByGroupSlice = createSlice({
  name: "fetchAllFarmers",
  initialState,
  reducers: {
    farmersListPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    farmersListSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.response = action.payload;
    },
    farmersListFail: (state, action) => {
      state.loading = false;
      state.response = null;
      state.error = action.payload;
    },
  },
});

export const { farmersListPending, farmersListSuccess, farmersListFail } =
  fetchFarmerByGroupSlice.actions;
export default fetchFarmerByGroupSlice.reducer;
