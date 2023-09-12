/* eslint-disable no-unused-vars */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getDetailedLatest } from "../../actions/Blogs";

const detailedLatest = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = detailedLatest.getInitialState({
  error: null,
  status: "idle",
});

const detailedLatestSlice = createSlice({
  name: "detailedLatest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailedLatest.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getDetailedLatest.fulfilled, (state, { payload }) => {
        state.status = "success";
        detailedLatest.setAll(state, payload);
      })
      .addCase(getDetailedLatest.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});

export const {
  selectAll: detailedLatestBlogs,
  selectById: detailedLatestId,
  selectIds: allDetailedLatestId,
} = detailedLatest.getSelectors((state) => state.detailedLatest);

export const Status = (state) => state.detailedLatest.status;
export const Error = (state) => state.detailedLatest.error;

export default detailedLatestSlice.reducer;
