import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    AllFieldFarmers: null,
    loading: false,
    error: null
}

// Create a slice
const fetchAllFieldFarmerSlice = createSlice({
    name: 'Field_Farmer',
    initialState,
    reducers: {
        FarmerPending: (state) => {
            state.loading = true;
            state.error = null;
        },
        FarmerSuccess: (state, action) => {
            state.error = null;
            state.loading = false;
            state.AllFieldFarmers = action.payload;
        },
        FarmerFailed: (state, action) => {
            state.AllFieldFarmers = null;
            state.error = action.payload;
            state.loading = false;
        }
    },
})

// Export actions and reducer
export const { FarmerPending, FarmerSuccess, FarmerFailed } = fetchAllFieldFarmerSlice.actions;
export default fetchAllFieldFarmerSlice.reducer;
