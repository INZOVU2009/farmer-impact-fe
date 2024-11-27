import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: null,
  loading: false,
};
const stationsListSlice = createSlice({
  name: "stationsList",
  initialState,
  reducers: {
    listPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    listSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.response = action.payload;
    },
    listFail: (state, action) => {
      state.loading = false;
      state.response = null;
      state.error = action.payload;
    },
  },
});

export const { listPending, listSuccess, listFail } = stationsListSlice.actions;
export default stationsListSlice.reducer;
