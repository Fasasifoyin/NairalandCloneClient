/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { createBlog, editBlog } from "../actions/Blogs";

const initialState = {
  status: "idle",
};

const createSliceComp = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createBlog.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(createBlog.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(editBlog.pending, (state) => {
        state.status = "pending";
      })
      .addCase(editBlog.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(editBlog.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const BlogStatus = (state) => state.blog.status;

export default createSliceComp.reducer;
