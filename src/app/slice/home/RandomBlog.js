import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { randomBlogs } from "../../actions/Blogs";

const randomBlogsAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = randomBlogsAdapter.getInitialState({
  status: "idle",
  error: null,
  totalPages: 0,
});

const randomBlogSlice = createSlice({
  name: "randomblogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(randomBlogs.pending, (state) => {
        state.status = "pending";
      })
      .addCase(randomBlogs.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.error = null;
        state.totalPages = payload.totalPages;
        randomBlogsAdapter.setAll(state, payload.data);
      })
      .addCase(randomBlogs.rejected, (state, { payload }) => {
        (state.status = "failed"), (state.error = payload);
      });
  },
});

export const { selectById: randomId, selectIds: allRandomId } =
  randomBlogsAdapter.getSelectors((state) => state.random);

export const Status = (state) => state.random.status;
export const Error = (state) => state.random.error;
export const TotalPages = (state) => state.random.totalPages;

export default randomBlogSlice.reducer;
