import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { errorHandler } from "../error";

// start
export const getComments = createAsyncThunk(
  "/comment/getComments",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await api.getComment(query);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error });
      return rejectWithValue(errorMessage);
    }
  }
);

export const createComment = createAsyncThunk(
  "/comment/createComment",
  async (form, { rejectWithValue }) => {
    try {
      const { comment, blogId } = form;
      const { data } = await api.createComment({ comment, blogId });
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);

export const createChildComment = createAsyncThunk(
  "/comment/createChildComment",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await api.createChildComment(form);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);

export const likeComment = createAsyncThunk(
  "/comment/likeComment",
  async (commentId, { rejectWithValue }) => {
    try {
      const { data } = await api.likeComment(commentId);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "/comment/deleteComment",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteComment(query);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteChildComment = createAsyncThunk(
  "/comment/deleteChildComment",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteChildComment(body);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);

export const likeChildComment = createAsyncThunk(
  "/comment/likeChildComment",
  async (form, { rejectWithValue }) => {
    try {
      const { data } = await api.likeChildComment(form);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);
//end
