import {
  assignFail,
  assignPending,
  assignSuccess,
} from "../../slices/parchment/assignParchmentGradeSlice";
import { ParchmentGrade } from "../../../api/parchmentApi";
import { toast } from "react-hot-toast";
export const assigParchmentGrade = (data, token) => async (dispatch) => {
  try {
    dispatch(assignPending());

    const res = await ParchmentGrade(data, token);
    console.log("res", res);
    dispatch(assignSuccess(res));
    toast.success(res.message);
    return res;
  } catch (error) {
    if (error) {
      console.log("err", error);

      toast.error(`${error.message} `);
      return dispatch(assignFail(error.message));
    }
    toast.error(`${error.Error}`);
    console.log("errrr", error);

    return dispatch(assignFail(error.Error));
  }
};
