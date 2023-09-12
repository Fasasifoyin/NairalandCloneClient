import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createComment = createAsyncThunk(
  "/comment/createComment",
  async (form, { rejectWithValue }) => {
    try {
      const { comment, blogId } = form;
      const { data } = await api.createComment({ comment, blogId });
      return data;
    } catch (error) {
      console.log(error);
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
    }
  }
);

export const getComments = createAsyncThunk(
  "/comment/getComments",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await api.getComment(query);
      return data;
    } catch (error) {
      console.log(error);
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
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
      console.log(error);
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
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
      console.log(error);
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
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
      console.log(error);
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "/comment/deleteComment",
  async (query, { rejectWithValue }) => {
    try {
      console.log(query);
      const { data } = await api.deleteComment(query);
      return data;
    } catch (error) {
      console.log(error);
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
    }
  }
);

export const deleteChildComment = createAsyncThunk(
  "/comment/deleteChildComment",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteChildComment(body);
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
    }
  }
);
