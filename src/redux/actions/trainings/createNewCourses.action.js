import { createNewCourse } from "../../../api/trainingsApi";
import { toast } from "react-hot-toast";
import {
  courseFail,
  coursePending,
  courseSuccess,
} from "../../slices/trainings/createNewCourseSlice";

export const createNewCoursesAction = (data, token) => async (dispatch) => {
  try {
    dispatch(coursePending());
    const res = await createNewCourse(data, token);
    toast.success(res.message);
    dispatch(courseSuccess(res));
    return res;
  } catch (error) {
    if (error) {
      toast.error(`${error.message}`);
      return dispatch(courseFail(error.message));
    }
    return dispatch(courseFail(error.Error));
  }
};
