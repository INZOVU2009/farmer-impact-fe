import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: null,
  error: null,
  loading: false,
};
const fetchTreeDetailsSlice = createSlice({
  name: "fetchTreeDetails",
  initialState,
  reducers: {
    detailsPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    detailsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.details = action.payload;
    },
    detailsFail: (state, action) => {
      state.loading = false;
      state.details = null;
      state.error = action.payload;
    },
  },
});

export const { detailsPending, detailsSuccess, detailsFail } =
  fetchTreeDetailsSlice.actions;
export default fetchTreeDetailsSlice.reducer;
