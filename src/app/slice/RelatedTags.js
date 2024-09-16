import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getTagBlogs } from "../actions/Blogs";

const relatedTagsAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = relatedTagsAdapter.getInitialState({
  status: "idle",
  error: null,
  totalPages: 0,
});

const relatedTagsSlice = createSlice({
  name: "tagBlogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTagBlogs.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getTagBlogs.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.error = null;
        state.totalPages = payload.totalPages;
        relatedTagsAdapter.setAll(state, payload.data);
      })
      .addCase(getTagBlogs.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const { selectById: relatedTagsId, selectIds: allRelatedTagsId } =
  relatedTagsAdapter.getSelectors((state) => state.relatedTags);

export const TotalPages = (state) => state.relatedTags.totalPages;
export const Error = (state) => state.relatedTags.error;
export const Status = (state) => state.relatedTags.status;

export default relatedTagsSlice.reducer;
