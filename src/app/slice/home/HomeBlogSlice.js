/* eslint-disable no-unused-vars */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getHomePageBlogs } from "../../actions/Blogs";

const homeAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = homeAdapter.getInitialState({
  status: "idle",
  error: null,
  totalPages: 0,
});

const homeSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomePageBlogs.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getHomePageBlogs.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.totalPages = payload.totalPages;
        homeAdapter.setAll(state, payload.data);
      })
      .addCase(getHomePageBlogs.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const {
  selectAll: tagsBlog,
  selectById: tagsBlogId,
  selectIds: allTagsBlogId,
} = homeAdapter.getSelectors((state) => state.home);

export const Status = (state) => state.home.status;
export const Error = (state) => state.home.error;
export const Total = (state) => state.home.totalPages;

export default homeSlice.reducer;
