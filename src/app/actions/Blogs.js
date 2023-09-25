import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "react-hot-toast";

export const createBlog = createAsyncThunk(
  "/blog/createBlog",
  async (formData, { rejectWithValue }) => {
    const { title, body, tags, filterImage } = formData;
    try {
      const { data } = await api.createBlog({
        title,
        body,
        tags,
        filterImage,
      });
      return data;
    } catch (error) {
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
    }
  }
);

export const editBlog = createAsyncThunk(
  "/blog/editBlog",
  async (formData, { rejectWithValue }) => {
    const { title, body, tags, filterImage, blogId, navigate } = formData;
    try {
      const { data, status } = await api.updateBlog({
        title,
        body,
        tags,
        filterImage,
        blogId,
      });
      if (status === 200) {
        navigate(`/${data.slug}`);
      }
      return "Blog edit successful";
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

export const deleteBlog = createAsyncThunk(
  "/profile/deleteBlog",
  async (body, { rejectWithValue }) => {
    const { blogId, setRemove } = body;
    try {
      const { data, status } = await api.deleteBlog(blogId);
      if (status === 200) {
        setRemove(false);
        toast.success("Blog deleted successfully")
      }
      return data;
    } catch (error) {
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(outputError);
      setRemove(false);
      return rejectWithValue(outputError);
    }
  }
);

export const getHomePageBlogs = createAsyncThunk(
  "/homepage/getHomePageBlogs",
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await api.homePageTags(page);
      return data;
    } catch (error) {
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
    }
  }
);

export const newPageSlide = createAsyncThunk(
  "/newpageslide",
  async (qty, { rejectWithValue }) => {
    try {
      const { data } = await api.newPageSlide(qty);
      return data;
    } catch (error) {
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "/singleBlog/getSingleProduct",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await api.getSingleProduct(slug);
      return data;
    } catch (error) {
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
    }
  }
);

export const getNewPageBlogs = createAsyncThunk(
  "/newpage/getNewPageBlogs",
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await api.newPage(page);
      return data;
    } catch (error) {
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
    }
  }
);

export const getRandomTags = createAsyncThunk(
  "/randomTags/getRandomTags",
  async (qty, { rejectWithValue }) => {
    try {
      const { data } = await api.randomTags(qty);
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

export const getRandomBlogs = createAsyncThunk(
  "/randomBlogs/getRandomBlogs",
  async (qty, { rejectWithValue }) => {
    try {
      const { data } = await api.randomBlogs(qty);
      return data;
    } catch (error) {
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
    }
  }
);

export const getFooter = createAsyncThunk(
  "/footer/getFooter",
  async (qty, { rejectWithValue }) => {
    try {
      const { data } = await api.footer(qty);
      return data;
    } catch (error) {
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(outputError);
    }
  }
);

export const getDetailedLatest = createAsyncThunk(
  "/detailedLatest/getDetailedLatest",
  async (qty, { rejectWithValue }) => {
    try {
      const { data } = await api.randomBlogs(qty);
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

export const getDetailedRelated = createAsyncThunk(
  "detailedRelated",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await api.getRelatedTags(query);
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
