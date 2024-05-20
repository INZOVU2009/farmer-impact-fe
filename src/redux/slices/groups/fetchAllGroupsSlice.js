import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: null,
  error: null,
  loading: false,
};
const fetchAllGroupsSlice = createSlice({
  name: "fetchAllGroups",
  initialState,
  reducers: {
    groupsPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    groupsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.groups = action.payload;
    },
    groupsFail: (state, action) => {
      state.loading = false;
      state.groups = null;
      state.error = action.payload;
    },
  },
});

export const { groupsPending, groupsSuccess, groupsFail } =
  fetchAllGroupsSlice.actions;
export default fetchAllGroupsSlice.reducer;
