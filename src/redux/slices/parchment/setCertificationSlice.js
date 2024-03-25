// selectedCertificationSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  Certification: null,
};

// Create slice
const selectedCertificationSlice = createSlice({
  name: "selectedCertification",
  initialState,
  reducers: {
    setSelectedCertification: (state, action) => {
      state.Certification = action.payload;
    },
    clearSelectedCertification: (state) => {
      state.Certification = null;
    },
  },
});

// Export actions
export const { setSelectedCertification, clearSelectedCertification } = selectedCertificationSlice.actions;

// Export reducer
export default selectedCertificationSlice.reducer;
