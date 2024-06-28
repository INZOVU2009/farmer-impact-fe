import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  phrase: null,
  error: null,
  loading: false,
};
const addNewPhraseSlice = createSlice({
  name: "addNewPhrase",
  initialState,
  reducers: {
    phrasePending: (state) => {
      state.loading = true;
      state.error = null;
    },
    phraseSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.phrase = action.payload;
    },
    phraseFail: (state, action) => {
      state.loading = false;
      state.phrase = null;
      state.error = action.payload;
    },
  },
});

export const { phrasePending, phraseSuccess, phraseFail } =
addNewPhraseSlice.actions;
export default addNewPhraseSlice.reducer;
