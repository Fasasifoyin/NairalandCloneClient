/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { getSingleBlog } from "../../actions/Blogs";

const initialState = {
  blog: {},
  error: null,
  status: "idle",
};

const detailedSlice = createSlice({
  name: "singleBlog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleBlog.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(getSingleBlog.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.error = null;
      state.blog = payload;
    });
    builder.addCase(getSingleBlog.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});

export const Details = (state) => state.single.blog;
export const Error = (state) => state.single.error;
export const Status = (state) => state.single.status;

export default detailedSlice.reducer;
