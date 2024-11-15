import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: null,
  loading: false,
};
const toggleGroupSlice = createSlice({
  name: "toggleGroup",
  initialState,
  reducers: {
    togglePending: (state) => {
      state.loading = true;
      state.error = null;
    },
    toggleSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.response = action.payload;
    },
    toggleFail: (state, action) => {
      state.loading = false;
      state.response = null;
      state.error = action.payload;
    },
    resetToggleGroupState(state, action) {
      state.response = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  togglePending,
  toggleSuccess,
  toggleFail,
  resetToggleGroupState,
} = toggleGroupSlice.actions;
export default toggleGroupSlice.reducer;
