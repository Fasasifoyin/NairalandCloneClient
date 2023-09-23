/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { generateotp, resetPassword, verifyotp } from "../actions/User";

const initialState = {
  email: "",
  status: "idle",
};

const resetSlice = createSlice({
  name: "reset",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(generateotp.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(generateotp.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.email = payload.mail;
      })
      .addCase(generateotp.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(verifyotp.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(verifyotp.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(verifyotp.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = "success";
        state.email = "";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = "failed";
      }),
});

export const ResetEmail = (state) => state.reset.email;
export const ResetStatus = (state) => state.reset.status;

export default resetSlice.reducer;
