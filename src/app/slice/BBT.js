import { createSlice } from "@reduxjs/toolkit";
import { getBlogsByTags } from "../actions/Blogs";

const initialState = {
  blogs: [],
  error: null,
  status: "idle",
};

const BBTSlice = createSlice({
  name: "BBT",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogsByTags.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getBlogsByTags.fulfilled, (state, { payload }) => {
        state.status = "success";
        (state.error = null), (state.blogs = payload);
      })
      .addCase(getBlogsByTags.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const Status = (state) => state.BBT.status;
export const Error = (state) => state.BBT.error;
export const Blogs = (state) => state.BBT.blogs;

export default BBTSlice.reducer;
