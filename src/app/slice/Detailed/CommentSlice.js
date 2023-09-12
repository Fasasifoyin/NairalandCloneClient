/* eslint-disable no-unused-vars */
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {
  createChildComment,
  createComment,
  deleteChildComment,
  deleteComment,
  getComments,
  likeChildComment,
  likeComment,
} from "../../actions/Comment";
import { toast } from "react-hot-toast";

const commentAdapter = createEntityAdapter({
  selectId: (e) => e._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = commentAdapter.getInitialState({
  error: null,
  status: "idle",
  // totalPages: 0,
  totalComments: 0,
  likeStatus: "idle",
  createStatus: "idle",
  childCommentStatus: "idle",
});

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setEmpty: (state, { payload }) => {
      // console.log(payload);
      commentAdapter.setAll(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getComments.fulfilled, (state, { payload }) => {
        (state.status = "success"),
          (state.totalComments = payload.totalComments),
          // (state.totalPages = payload.totalPages);
          commentAdapter.upsertMany(state, payload.data);
      })
      .addCase(getComments.rejected, (state, { payload }) => {
        (state.status = "failed"), (state.error = payload);
      })
      .addCase(createComment.pending, (state, action) => {
        state.createStatus = "creating";
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        (state.createStatus = "success"),
          (state.totalComments = payload.totalComments),
          commentAdapter.addOne(state, payload.data);
        toast.success("Comments added successfully");
      })
      .addCase(createComment.rejected, (state, { payload }) => {
        (state.createStatus = "failed"), toast.error(payload);
      })
      .addCase(likeComment.pending, (state, action) => {
        state.likeStatus = "pending";
      })
      .addCase(likeComment.fulfilled, (state, { payload }) => {
        state.likeStatus = "success";
        commentAdapter.upsertOne(state, payload);
      })
      .addCase(likeComment.rejected, (state, { payload }) => {
        toast.error(payload);
        state.likeStatus = "failed";
      })
      .addCase(createChildComment.pending, (state, action) => {
        state.childCommentStatus = "pending";
      })
      .addCase(createChildComment.fulfilled, (state, { payload }) => {
        state.childCommentStatus = "success";
        commentAdapter.upsertOne(state, payload);
      })
      .addCase(createChildComment.rejected, (state, { payload }) => {
        toast.error(payload);
        state.childCommentStatus = "failed";
      })
      .addCase(likeChildComment.pending, (state, action) => {
        // state.childCommentStatus = "pending";
      })
      .addCase(likeChildComment.fulfilled, (state, { payload }) => {
        // state.childCommentStatus = "success";
        commentAdapter.upsertOne(state, payload);
      })
      .addCase(likeChildComment.rejected, (state, { payload }) => {
        toast.error(payload);
        // state.childCommentStatus = "failed";
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        commentAdapter.removeOne(state, payload.data._id);
        (state.totalComments = payload.totalComments),
          toast.success("Comment deleted successfully");
      })
      .addCase(deleteComment.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(deleteChildComment.fulfilled, (state, { payload }) => {
        commentAdapter.upsertOne(state, payload);
        toast.success("Comment deleted successfully");
      })
      .addCase(deleteChildComment.rejected, (state, { payload }) => {
        toast.error(payload);
      });
  },
});

export const {
  selectAll: allComment,
  selectById: commentId,
  selectIds: allCommentIds,
} = commentAdapter.getSelectors((state) => state.comment);

export const Status = (state) => state.comment.status;
export const LikeStatus = (state) => state.comment.likeStatus;
export const CreateStatus = (state) => state.comment.createStatus;
export const Error = (state) => state.comment.error;
export const Total = (state) => state.comment.totalPages;
export const TotalComments = (state) => state.comment.totalComments;
export const ChildCommentStatus = (state) => state.comment.childCommentStatus;

export const { setEmpty } = commentSlice.actions;

export default commentSlice.reducer;
