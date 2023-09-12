/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { createBlog, editBlog } from "../actions/Blogs";
import { toast } from "react-hot-toast";

const initialState = {
  error: null,
  status: "idle",
  editStatus: "idle",
};

const createSliceComp = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(createBlog.fulfilled, (state, { payload }) => {
        state.status = "success";
        toast.success(payload.message);
      })
      .addCase(createBlog.rejected, (state, { payload }) => {
        state.status = "failed";
        toast.error(payload);
      })
      .addCase(editBlog.pending, (state, action) => {
        state.editStatus = "pending";
      })
      .addCase(editBlog.fulfilled, (state, { payload }) => {
        state.editStatus = "success";
        toast.success(payload);
      })
      .addCase(editBlog.rejected, (state, { payload }) => {
        state.editStatus = "failed";
        toast.error(payload);
      });
  },
});

export const BlogStatus = (state) => state.blog.status;
export const EditStatus = (state) => state.blog.editStatus;

export default createSliceComp.reducer;
