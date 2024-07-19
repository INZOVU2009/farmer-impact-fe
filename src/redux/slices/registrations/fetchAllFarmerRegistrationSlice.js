import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  registrations: null,
  loading: false,
  error: null,
};

// Create a slice
const fetchAllFarmerRegistrationsSlice = createSlice({
  name: "fetchAllFarmerRegistrations",
  initialState,
  reducers: {
    registrationsPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    registrationsSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.registrations = action.payload;
    },
    registrationsFailed: (state, action) => {
      state.registrations = null;
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions and reducer
export const {
  registrationsPending,
  registrationsSuccess,
  registrationsFailed,
} = fetchAllFarmerRegistrationsSlice.actions;
export default fetchAllFarmerRegistrationsSlice.reducer;
