/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { login, signUp, updatePhoto } from "../actions/User";
import { toast } from "react-hot-toast";

const initialState = {
  user: localStorage.getItem("nairalandUser")
    ? JSON.parse(localStorage.getItem("nairalandUser"))
    : {},
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGOUT: (state, action) => {
      localStorage.removeItem("nairalandUser");
      toast.success("LOGGED OUT");
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.user = payload;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        (state.status = "failed"), (state.error = payload);
      })
      .addCase(login.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.user = payload;
      })
      .addCase(login.rejected, (state, { payload }) => {
        (state.status = "failed"), (state.error = payload);
      })
      .addCase(updatePhoto.fulfilled, (state, { payload }) => {
        state.user = { ...state.user, image: payload };
        localStorage.setItem("nairalandUser", JSON.stringify(state.user));
      });
  },
});

export const UserDetails = (state) => state.user.user;
export const UserStatus = (state) => state.user.status;
export const UserError = (state) => state.user.error;

export const { LOGOUT } = userSlice.actions;

export default userSlice.reducer;
