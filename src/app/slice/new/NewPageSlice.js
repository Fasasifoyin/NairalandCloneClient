/* eslint-disable no-unused-vars */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getNewPageBlogs } from "../../actions/Blogs";

const newAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = newAdapter.getInitialState({
  status: "idle",
  error: null,
  totalPages: 0,
});

const newSlice = createSlice({
  name: "newpage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewPageBlogs.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getNewPageBlogs.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.totalPages = payload.totalPages;
        newAdapter.setAll(state, payload.data);
      })
      .addCase(getNewPageBlogs.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const {
  selectAll: NewBlog,
  selectById: NewBlogId,
  selectIds: allNewBlogId,
} = newAdapter.getSelectors((state) => state.new);

export const Status = (state) => state.new.status;
export const Error = (state) => state.new.error;
export const Total = (state) => state.new.totalPages;

export default newSlice.reducer;
