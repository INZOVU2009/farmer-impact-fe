import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allAccess: null,
  error: null,
  loading: false,
};
const fetchAllUserAccessSlice = createSlice({
  name: "allUserAccess",
  initialState,
  reducers: {
    allAccessPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    allAccessSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.allAccess = action.payload;
    },
    allAccessFail: (state, action) => {
      state.loading = false;
      state.allAccess = null;
      state.error = action.payload;
    },
  },
});

export const { allAccessPending, allAccessSuccess, allAccessFail } =
  fetchAllUserAccessSlice.actions;
export default fetchAllUserAccessSlice.reducer;
