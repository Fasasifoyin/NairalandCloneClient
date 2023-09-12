/* eslint-disable no-unused-vars */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { getFooter } from "../actions/Blogs";

const footerAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = footerAdapter.getInitialState({
  status: "idle",
  error: null,
});

const footerSlice = createSlice({
  name: "footer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFooter.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getFooter.fulfilled, (state, { payload }) => {
        (state.status = "success"), footerAdapter.setAll(state, payload);
      })
      .addCase(getFooter.rejected, (state, { payload }) => {
        (state.status = "failed"), (state.error = payload);
      });
  },
});

export const {
  selectAll: footerBlogs,
  selectById: footerBlogsId,
  selectIds: allFooterBlogsId,
} = footerAdapter.getSelectors((state) => state.footer);

export const Status = (state) => state.footer.status;
export const Error = (state) => state.footer.error;

export default footerSlice.reducer;
