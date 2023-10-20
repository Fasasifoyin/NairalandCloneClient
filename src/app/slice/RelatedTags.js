/* eslint-disable no-unused-vars */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getRelatedTags } from "../actions/Blogs";

const relatedTagsAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = relatedTagsAdapter.getInitialState({
  status: "idle",
  error: null,
  totalPages: 0,
});

const relatedTagsSlice = createSlice({
  name: "relatedTags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRelatedTags.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getRelatedTags.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.totalPages = payload.totalPages;
        relatedTagsAdapter.setAll(state, payload.data);
      })
      .addCase(getRelatedTags.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const {
  selectAll: relatedTags,
  selectById: relatedTagsId,
  selectIds: allRelatedTagsId,
} = relatedTagsAdapter.getSelectors((state) => state.relatedTags);

export const TotalPages = (state) => state.relatedTags.totalPages;
export const Error = (state) => state.relatedTags.error;
export const Status = (state) => state.relatedTags.status;

export default relatedTagsSlice.reducer;
