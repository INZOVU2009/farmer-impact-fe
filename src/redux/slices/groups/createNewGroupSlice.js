import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: null,
  loading: false,
};
const createNewGroupSlice = createSlice({
  name: "createNewGroup",
  initialState,
  reducers: {
    createPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    createSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.response = action.payload;
    },
    createFail: (state, action) => {
      state.loading = false;
      state.response = null;
      state.error = action.payload;
    },
    resetCreateGroupState(state, action) {
      state.response = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { createPending, createSuccess, createFail, resetCreateGroupState } =
  createNewGroupSlice.actions;
export default createNewGroupSlice.reducer;
