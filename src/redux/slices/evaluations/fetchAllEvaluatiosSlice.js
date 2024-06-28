import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  evaluations: null,
  error: null,
  loading: false,
};
const fetchAllEvaluationsSlice = createSlice({
  name: "fetchAllEvaluations",
  initialState,
  reducers: {
    evaluationsPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    evaluationsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.evaluations = action.payload;
    },
    evaluationsFail: (state, action) => {
      state.loading = false;
      state.evaluations = null;
      state.error = action.payload;
    },
  },
});

export const { evaluationsPending, evaluationsSuccess, evaluationsFail } =
  fetchAllEvaluationsSlice.actions;
export default fetchAllEvaluationsSlice.reducer;
