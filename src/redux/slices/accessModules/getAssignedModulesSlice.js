import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modulesAssigned: null,
  error: null,
  loading: false,
};
const fetchAssignedModulesSlice = createSlice({
  name: "fetchAssignedModules",
  initialState,
  reducers: {
    assignedModulesPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    assignedModulesSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.modulesAssigned = action.payload;
    },
    assignedModulesFail: (state, action) => {
      state.loading = false;
      state.modulesAssigned = null;
      state.error = action.payload;
    },
  },
});

export const {
  assignedModulesPending,
  assignedModulesSuccess,
  assignedModulesFail,
} = fetchAssignedModulesSlice.actions;
export default fetchAssignedModulesSlice.reducer;
