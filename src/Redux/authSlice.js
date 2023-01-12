import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
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
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFectching = false;
      state.login.error = true;
    },
    logoutSuccess: (state) => {
      state.login.currentUser = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logoutSuccess } =
  authSlice.actions;

export default authSlice.reducer;
