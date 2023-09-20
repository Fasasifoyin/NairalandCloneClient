/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import {
  profile,
  updateAddress,
  updatePhoto,
  updateProfile,
} from "../actions/User";

const initialState = {
  userDetails: {},
  error: null,
  status: "idle",
  photoStatus: "idle",
  updateStatus: "idle",
  addressStatus: "idle",
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
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.photoStatus = "failed";
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.updateStatus = "pending";
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        (state.updateStatus = "success"),
          (state.userDetails = {
            ...state.userDetails,
            firstName: payload.firstName,
            lastName: payload.lastName,
            userName: payload.userName,
            email: payload.email,
            phone: payload.phone,
            occupation: payload.occupation,
            about: payload.about,
          });
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateStatus = "failed";
      })
      .addCase(updateAddress.pending, (state, action) => {
        state.addressStatus = "pending";
      })
      .addCase(updateAddress.fulfilled, (state, { payload }) => {
        (state.addressStatus = "success"),
          (state.userDetails = {
            ...state.userDetails,
            country: payload.country,
            state: payload.state,
            postalCode: payload.postalCode,
          });
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.addressStatus = "failed";
      });
  },
});

export const ProfileDetails = (state) => state.profile.userDetails;
export const ProfileError = (state) => state.profile.error;
export const ProfileStatus = (state) => state.profile.status;
export const PhotoStatus = (state) => state.profile.photoStatus;
export const UpdateStatus = (state) => state.profile.updateStatus;
export const AddressStatus = (state) => state.profile.addressStatus;

export default porfileSlice.reducer;
