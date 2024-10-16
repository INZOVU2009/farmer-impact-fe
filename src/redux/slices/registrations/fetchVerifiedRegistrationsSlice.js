import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  verifiedRegistrations: null,
  loading: false,
  error: null,
};

// Create a slice
const fetchAllVerifiedRegistrationsSlice = createSlice({
  name: "fetchAllVerifiedRegistrations",
  initialState,
  reducers: {
    verifiedRegistrationsPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    verifiedRegistrationsSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.verifiedRegistrations = action.payload;
    },
    verifiedRegistrationsFailed: (state, action) => {
      state.verifiedRegistrations = null;
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions and reducer
export const {
  verifiedRegistrationsPending,
  verifiedRegistrationsSuccess,
  verifiedRegistrationsFailed,
} = fetchAllVerifiedRegistrationsSlice.actions;
export default fetchAllVerifiedRegistrationsSlice.reducer;
