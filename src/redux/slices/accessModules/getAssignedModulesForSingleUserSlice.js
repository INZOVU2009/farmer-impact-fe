import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 assignedModulesList: null,
  error: null,
  loading: false,
};
const getAssignedModulesForSingleUserSlice = createSlice({
  name: "getAssignedModulesForSingleUser",
  initialState,
  reducers: {
    assignedModulesListPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    assignedModulesListSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.assignedModulesList = action.payload;
    },
    assignedModulesListFail: (state, action) => {
      state.loading = false;
      state.assignedModulesList = null;
      state.error = action.payload;
    },
  },
});

export const {
  assignedModulesListPending,
  assignedModulesListSuccess,
  assignedModulesListFail,
} = getAssignedModulesForSingleUserSlice.actions;
export default getAssignedModulesForSingleUserSlice.reducer;
