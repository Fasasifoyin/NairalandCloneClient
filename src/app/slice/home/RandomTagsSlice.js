/* eslint-disable no-unused-vars */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getRandomTags } from "../../actions/Blogs";

const randomTagsAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = randomTagsAdapter.getInitialState({
  status: "idle",
  error: null,
});

const randomTagsSlice = createSlice({
  name: "randomTags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRandomTags.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getRandomTags.fulfilled, (state, { payload }) => {
        (state.status = "success"), randomTagsAdapter.setAll(state, payload);
      })
      .addCase(getRandomTags.rejected, (state, { payload }) => {
        (state.status = "failed"), (state.error = payload);
      });
  },
});

export const {
  selectAll: randomTags,
  selectById: randomTagsId,
  selectIds: allRandomTagsId,
} = randomTagsAdapter.getSelectors((state) => state.randomTags);

export const Status = (state) => state.randomTags.status;
export const Error = (state) => state.randomTags.error;

export default randomTagsSlice.reducer;
