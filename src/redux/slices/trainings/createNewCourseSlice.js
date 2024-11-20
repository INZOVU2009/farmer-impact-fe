import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  response: null,
  error: null,
  loading: false,
};
const createNewCourseSlice = createSlice({
  name: "createNewCourse",
  initialState,
  reducers: {
    coursePending: (state) => {
      state.loading = true;
      state.error = null;
    },
    courseSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.response = action.payload;
    },
    courseFail: (state, action) => {
      state.loading = false;
      state.response = null;
      state.error = action.payload;
    },
    resetCourseCreateState(state, action) {
      state.response = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  coursePending,
  courseSuccess,
  courseFail,
  resetCourseCreateState,
} = createNewCourseSlice.actions;
export default createNewCourseSlice.reducer;
