import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutSuccess,
} from "./authSlice";

const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart);
  try {
    const res = await axios.post("http://localhost:3001/user/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFailed());
  }
};

const logoutUser = async (dispatch) => {
  dispatch(logoutSuccess());
};

const getAllproduct = async () => {
  try {
    const res = await axios.get("http://localhost:3001/product");
    return res.data;
  } catch (error) {
    alert(error);
  }
};

export { loginUser, logoutUser, getAllproduct };
