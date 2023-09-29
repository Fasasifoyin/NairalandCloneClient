/* eslint-disable no-unused-vars */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { search } from "../actions/Search";

const searchAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = searchAdapter.getInitialState({
  status: "idle",
  error: null,
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(search.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.error = null;
        searchAdapter.setAll(state, payload);
      })
      .addCase(search.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
        searchAdapter.setAll(state, []);
      });
  },
});

export const {
  selectAll: searchBlog,
  selectById: searchBlogId,
  selectIds: allSearchBlogId,
} = searchAdapter.getSelectors((state) => state.search);

export const Status = (state) => state.search.status;
export const Error = (state) => state.search.error;

export default searchSlice.reducer;
