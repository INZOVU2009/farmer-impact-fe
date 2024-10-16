import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  approvedRegistrations: null,
  loading: false,
  error: null,
};

// Create a slice
const fetchAllApprovedRegistrationsSlice = createSlice({
  name: "fetchAllApprovedRegistrations",
  initialState,
  reducers: {
    approvedRegistrationsPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    approvedRegistrationsSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.approvedRegistrations = action.payload;
    },
    approvedRegistrationsFailed: (state, action) => {
      state.approvedRegistrations = null;
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions and reducer
export const {
  approvedRegistrationsPending,
  approvedRegistrationsSuccess,
  approvedRegistrationsFailed,
} = fetchAllApprovedRegistrationsSlice.actions;
export default fetchAllApprovedRegistrationsSlice.reducer;
