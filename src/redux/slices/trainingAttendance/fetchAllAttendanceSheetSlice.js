import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendenceSheet: null,
  error: null,
  loading: false,
};
const fetchAllAttendenceSheetSlice = createSlice({
  name: "fetchAllAttendenceSheet",
  initialState,
  reducers: {
    attendenceSheetPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    attendenceSheetSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.attendenceSheet = action.payload;
    },
    attendenceSheetFail: (state, action) => {
      state.loading = false;
      state.attendenceSheet = null;
      state.error = action.payload;
    },
  },
});

export const {
  attendenceSheetPending,
  attendenceSheetSuccess,
  attendenceSheetFail,
} = fetchAllAttendenceSheetSlice.actions;
export default fetchAllAttendenceSheetSlice.reducer;
