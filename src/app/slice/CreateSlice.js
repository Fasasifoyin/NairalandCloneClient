/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { createBlog, editBlog } from "../actions/Blogs";

const initialState = {
  status: "idle",
  editStatus: "idle",
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
        state.editStatus = "pending";
      })
      .addCase(editBlog.fulfilled, (state) => {
        state.editStatus = "success";
      })
      .addCase(editBlog.rejected, (state) => {
        state.editStatus = "failed";
      });
  },
});

export const BlogStatus = (state) => state.blog.status;
export const EditStatus = (state) => state.blog.editStatus;

export default createSliceComp.reducer;
