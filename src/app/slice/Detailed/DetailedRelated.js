/* eslint-disable no-unused-vars */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getDetailedRelated } from "../../actions/Blogs";

const detailedRelated = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = detailedRelated.getInitialState({
  error: null,
  status: "idle",
});

const detailedRelatedSlice = createSlice({
  name: "detailedRelated",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailedRelated.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getDetailedRelated.fulfilled, (state, { payload }) => {
        state.status = "success";
        detailedRelated.setAll(state, payload);
      })
      .addCase(getDetailedRelated.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const {
  selectAll: detailedRelatedBlogs,
  selectById: detailedRelatedId,
  selectIds: allDetailedRelatedId,
} = detailedRelated.getSelectors((state) => state.detailedRelated);

export const Status = (state) => state.detailedRelated.status;
export const Error = (state) => state.detailedRelated.error;

export default detailedRelatedSlice.reducer;
