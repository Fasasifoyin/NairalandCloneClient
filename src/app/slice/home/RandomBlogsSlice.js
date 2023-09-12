/* eslint-disable no-unused-vars */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getRandomBlogs } from "../../actions/Blogs";

const randomBlogsAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = randomBlogsAdapter.getInitialState({
  status: "idle",
  error: null,
});

const randomBlogsSlice = createSlice({
  name: "randomBlogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRandomBlogs.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getRandomBlogs.fulfilled, (state, { payload }) => {
        (state.status = "success"), randomBlogsAdapter.setAll(state, payload);
      })
      .addCase(getRandomBlogs.rejected, (state, { payload }) => {
        (state.status = "failed"), (state.error = payload);
      });
  },
});

export const {
  selectAll: randomBlogs,
  selectById: randomBlogsId,
  selectIds: allRandomBlogsId,
} = randomBlogsAdapter.getSelectors((state) => state.randomBlogs);

export const Status = (state) => state.randomBlogs.status;
export const Error = (state) => state.randomBlogs.error;

export default randomBlogsSlice.reducer;
