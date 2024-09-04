import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { homeLatestNews, latestNews } from "../actions/Blogs";

const latestAdapter = createEntityAdapter({
  selectId: (e) => e._id,
});

const initialState = latestAdapter.getInitialState({
  status: "idle",
  homeStatus: "idle",
  error: null,
  homeError: null,
  totalPages: 0,
  homeLatestNews: [],
});

const latestSlice = createSlice({
  name: "latest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(latestNews.pending, (state) => {
        state.status = "pending";
      })
      .addCase(latestNews.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.error = null;
        state.totalPages = payload.totalPages;
        latestAdapter.upsertMany(state, payload.data);
      })
      .addCase(latestNews.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      })
      .addCase(homeLatestNews.pending, (state) => {
        state.homeStatus = "pending";
      })
      .addCase(homeLatestNews.fulfilled, (state, { payload }) => {
        state.homeStatus = "success";
        state.homeError = null;
        state.homeLatestNews = payload.data;
      })
      .addCase(homeLatestNews.rejected, (state, { payload }) => {
        state.homeStatus = "failed";
        state.homeError = payload;
      });
  },
});

export const { selectById: latestId, selectIds: allLatestId } =
  latestAdapter.getSelectors((state) => state.latest);

export const Status = (state) => state.latest.status;
export const HomeStatus = (state) => state.latest.homeStatus;
export const Error = (state) => state.latest.error;
export const HomeError = (state) => state.latest.homeError;
export const TotalPages = (state) => state.latest.totalPages;
export const HomeLatestNews = (state) => state.latest.homeLatestNews;

export default latestSlice.reducer;
