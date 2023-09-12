/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { newPageSlide } from "../../actions/Blogs";

const initialState = {
  slides: [],
  error: null,
  status: "idle",
};

const newSliderSlice = createSlice({
  name: "newpageslide",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newPageSlide.pending, (state, action) => {
        state.status = "idle";
      })
      .addCase(newPageSlide.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.slides = payload;
      })
      .addCase(newPageSlide.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const Slides = (state) => state.newPageSlide.slides;
export const Status = (state) => state.newPageSlide.status;
export const Error = (state) => state.newPageSlide.error;

export default newSliderSlice.reducer;
