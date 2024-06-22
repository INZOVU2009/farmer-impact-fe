import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  updatedTranslation: null,
  error: null,
  loading: false,
};
const updateTranslationSlice = createSlice({
  name: "updateTranslation",
  initialState,
  reducers: {
    updatedTranslationPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    updatedTranslationSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.updatedTranslation = action.payload;
    },
    updatedTranslationFail: (state, action) => {
      state.loading = false;
      state.updatedTranslation = null;
      state.error = action.payload;
    },
  },
});

export const { updatedTranslationPending, updatedTranslationSuccess, updatedTranslationFail } =
updateTranslationSlice.actions;
export default updateTranslationSlice.reducer;
