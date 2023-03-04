import { createSlice } from "@reduxjs/toolkit";
import { delete_cookie, setCookie } from "./cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: JSON.parse(localStorage?.getItem("user")),
      isFectching: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFectching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFectching = false;
      state.login.currentUser = action.payload.data;
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      setCookie("token", JSON.stringify(action.payload.accesstoken), 3);
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFectching = false;
      state.login.error = true;
    },
    logoutSuccess: (state) => {
      state.login.currentUser = null;
      localStorage.removeItem("user");
      delete_cookie("token");
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logoutSuccess } =
  authSlice.actions;

export default authSlice.reducer;
