/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { getSingleProduct } from "../../actions/Blogs";

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
    builder.addCase(getSingleProduct.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(getSingleProduct.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.error = null;
      state.blog = payload;
    });
    builder.addCase(getSingleProduct.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});

export const Details = (state) => state.single.blog;
export const Error = (state) => state.single.error;
export const Status = (state) => state.single.status;

export default detailedSlice.reducer;
