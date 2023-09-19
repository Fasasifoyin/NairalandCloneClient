/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { profile, updatePhoto } from "../actions/User";

const initialState = {
  userDetails: {},
  error: null,
  status: "idle",
  photoStatus: "idle",
};

const porfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(profile.fulfilled, (state, { payload }) => {
        (state.status = "success"), (state.userDetails = payload);
      })
      .addCase(profile.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(updatePhoto.pending, (state, action) => {
        state.photoStatus = "pending";
      })
      .addCase(updatePhoto.fulfilled, (state, { payload }) => {
        (state.photoStatus = "success"),
          (state.userDetails = { ...state.userDetails, image: payload });
      });
  },
});

export const ProfileDetails = (state) => state.profile.userDetails;
export const ProfileError = (state) => state.profile.error;
export const ProfileStatus = (state) => state.profile.status;
export const PhotoStatus = (state) => state.profile.photoStatus;

export default porfileSlice.reducer;
