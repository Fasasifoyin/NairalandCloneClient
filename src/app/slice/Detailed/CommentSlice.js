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
  totalComments: 0,
  createStatus: "idle",
  likeStatus: "idle",
  childCommentStatus: "idle",
  deleteCommentStatus: "idle",
  deleteChildCommentStatus: "idle",
  likeChildCommentStatus: "idle",
});

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setEmpty: (state, { payload }) => {
      commentAdapter.setAll(state, payload);
      (state.error = null), (state.totalComments = 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getComments.fulfilled, (state, { payload }) => {
        (state.status = "success"),
          (state.totalComments = payload.totalComments),
          commentAdapter.upsertMany(state, payload.data);
        state.error = null;
      })
      .addCase(getComments.rejected, (state, { payload }) => {
        (state.status = "failed"), (state.error = payload);
      })
      .addCase(createComment.pending, (state) => {
        state.createStatus = "pending";
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        (state.createStatus = "success"),
          (state.totalComments = payload.totalComments),
          commentAdapter.addOne(state, payload.data);
        toast.success("Comment added successfully");
      })
      .addCase(createComment.rejected, (state) => {
        state.createStatus = "failed";
      })
      .addCase(likeComment.pending, (state) => {
        state.likeStatus = "pending";
      })
      .addCase(likeComment.fulfilled, (state, { payload }) => {
        state.likeStatus = "success";
        commentAdapter.upsertOne(state, payload);
      })
      .addCase(likeComment.rejected, (state) => {
        state.likeStatus = "failed";
      })
      .addCase(createChildComment.pending, (state) => {
        state.childCommentStatus = "pending";
      })
      .addCase(createChildComment.fulfilled, (state, { payload }) => {
        state.childCommentStatus = "success";
        commentAdapter.upsertOne(state, payload);
        toast.success("Comment added successfully");
      })
      .addCase(createChildComment.rejected, (state) => {
        state.childCommentStatus = "failed";
      })
      .addCase(likeChildComment.pending, (state) => {
        state.likeChildCommentStatus = "pending";
      })
      .addCase(likeChildComment.fulfilled, (state, { payload }) => {
        state.likeChildCommentStatus = "success";
        commentAdapter.upsertOne(state, payload);
      })
      .addCase(likeChildComment.rejected, (state) => {
        state.likeChildCommentStatus = "failed";
      })
      .addCase(deleteComment.pending, (state) => {
        state.deleteCommentStatus = "pending";
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.deleteCommentStatus = "success";
        commentAdapter.removeOne(state, payload.id);
        (state.totalComments = payload.totalComments),
          toast.success("Comment deleted successfully");
      })
      .addCase(deleteComment.rejected, (state) => {
        state.deleteCommentStatus = "failed";
      })
      .addCase(deleteChildComment.pending, (state) => {
        state.deleteChildCommentStatus = "pending";
      })
      .addCase(deleteChildComment.fulfilled, (state, { payload }) => {
        state.deleteChildCommentStatus = "success";
        commentAdapter.upsertOne(state, payload);
        toast.success("Comment deleted successfully");
      })
      .addCase(deleteChildComment.rejected, (state) => {
        state.deleteChildCommentStatus = "failed";
      });
  },
});

export const {
  selectAll: allComment,
  selectById: commentId,
  selectIds: allCommentIds,
} = commentAdapter.getSelectors((state) => state.comment);

export const Status = (state) => state.comment.status;
export const Error = (state) => state.comment.error;
export const TotalComments = (state) => state.comment.totalComments;
export const LikeStatus = (state) => state.comment.likeStatus;
export const CreateStatus = (state) => state.comment.createStatus;
export const ChildCommentStatus = (state) => state.comment.childCommentStatus;
export const DeleteCommentStatus = (state) => state.comment.deleteCommentStatus;
export const DeleteChildCommentStatus = (state) =>
  state.comment.deleteChildCommentStatus;
export const LikeChildCommentStatus = (state) =>
  state.comment.likeChildCommentStatus;

export const { setEmpty } = commentSlice.actions;

export default commentSlice.reducer;
