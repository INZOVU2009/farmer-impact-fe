/* eslint-disable */
import { toast } from "react-hot-toast";
import { Userlogin } from "../../../api/userApi";
import { jwtDecode } from "jwt-decode";
import {
  loginPending,
  loginFail,
  loginSuccess,
} from "../../slices/auth/loginSlice";
import { fetchToken } from "../../slices/auth/fetchTokenSlice";
import { decodeToken } from "../../slices/auth/fetchTokenSlice";
import { fetchFail } from "../../slices/auth/fetchTokenSlice";
export const login = (userData) => async (dispatch) => {
  try {
    dispatch(loginPending());
    const res = await Userlogin(userData);
    if (res.token) {
      localStorage.setItem("token", res.token);
      dispatch(loginSuccess(res));
      return res;
    } else {
      toast.error(error.message || "Invalid Credentials");
      return dispatch(loginFail("Invalid Credentials."));
    }
  } catch (error) {
    toast.error(error.message || "Invalid Credentials");
    return dispatch(loginFail("Invalid Credentials."));
  }
};

export const handleToken = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    dispatch(fetchToken(token));
    dispatch(decodeToken(decodedToken));
  } else {
    dispatch(fetchFail());
  }
};
