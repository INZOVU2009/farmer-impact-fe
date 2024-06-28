import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  removedTranslation: null,
  error: null,
  loading: false,
};
const deleteTranslationsSlice = createSlice({
  name: "deleteTranslation",
  initialState,
  reducers: {
    removedTranslationPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    removedTranslationSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.removedTranslation = action.payload;
    },
    removedTranslationFail: (state, action) => {
      state.loading = false;
      state.removedTranslation = null;
      state.error = action.payload;
    },
  },
});

export const { removedTranslationPending, removedTranslationSuccess, removedTranslationFail } =
deleteTranslationsSlice.actions;
export default deleteTranslationsSlice.reducer;
