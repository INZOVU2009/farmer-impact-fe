import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  delete: null,
  error: null,
  loading: false,
};
const deleteHouseholdTreesSlice = createSlice({
  name: "deleteHouseholdTrees",
  initialState,
  reducers: {
    deletePending: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.delete = action.payload;
    },
    deleteFail: (state, action) => {
      state.loading = false;
      state.delete = null;
      state.error = action.payload;
    },
  },
});

export const { deletePending, deleteSuccess, deleteFail } =
  deleteHouseholdTreesSlice.actions;
export default deleteHouseholdTreesSlice.reducer;
