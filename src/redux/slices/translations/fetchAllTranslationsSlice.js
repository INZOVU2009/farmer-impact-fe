import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  translations: null,
  error: null,
  loading: false,
};
const fetchAllTranslationsSlice = createSlice({
  name: "fetchAllTranslations",
  initialState,
  reducers: {
    translationsPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    translationsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.translations = action.payload;
    },
    translationsFail: (state, action) => {
      state.loading = false;
      state.translations = null;
      state.error = action.payload;
    },
  },
});

export const { translationsPending, translationsSuccess, translationsFail } =
  fetchAllTranslationsSlice.actions;
export default fetchAllTranslationsSlice.reducer;
