import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "react-hot-toast";
import { errorHandler } from "../error";

//start
export const latestNews = createAsyncThunk(
  "/latest/latestNews",
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await api.latestNews(page);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error });
      return rejectWithValue(errorMessage);
    }
  }
);

export const homeLatestNews = createAsyncThunk(
  "/latest/homeLatestNews",
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await api.latestNews(page);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error });
      return rejectWithValue(errorMessage);
    }
  }
);

export const getBlogsByTags = createAsyncThunk(
  "/BBT/getBlogsByTags",
  async (tagsRequest, { rejectWithValue }) => {
    try {
      const { data } = await api.getBlogsByTags(tagsRequest);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error });
      return rejectWithValue(errorMessage);
    }
  }
);

export const randomBlogs = createAsyncThunk(
  "/randomblogs/randomBlogs",
  async (page, { rejectWithValue }) => {
    try {
      const response = await api.getRandomBlogs(page);
      const newToken = response.headers["x-blog-pagination-token"];
      if (response.status === 200 && newToken) {
        localStorage.setItem("blogPaginationToken", JSON.stringify(newToken));
      }
      return response.data;
    } catch (error) {
      const errorMessage = errorHandler({ error });
      return rejectWithValue(errorMessage);
    }
  }
);

export const getSingleBlog = createAsyncThunk(
  "/singleBlog/getSingleBlog",
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await api.getSingleBlog(slug);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error });
      return rejectWithValue(errorMessage);
    }
  }
);

export const getDetailedRelated = createAsyncThunk(
  "/detailedRelated/getDetailedRelated",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await api.getRelatedTags(query);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error });
      return rejectWithValue(errorMessage);
    }
  }
);

export const getTagBlogs = createAsyncThunk(
  "/tagBlogs/getTagBlogs",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await api.getRelatedTags(query);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error });
      return rejectWithValue(errorMessage);
    }
  }
);

export const createBlog = createAsyncThunk(
  "/blog/createBlog",
  async (form, { rejectWithValue }) => {
    try {
      const { title, body, tags, images, resetForm } = form;
      const { data, status } = await api.createBlog({
        title,
        body,
        tags,
        images,
      });
      if (status === 201) {
        resetForm();
        toast.success(data.message);
      }
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);

export const editBlog = createAsyncThunk(
  "/blog/editBlog",
  async (form, { rejectWithValue }) => {
    try {
      const { title, body, tags, images, blogId, resetForm, navigate } = form;
      const { data, status } = await api.updateBlog({
        title,
        body,
        tags,
        images,
        blogId,
      });
      if (status === 200) {
        resetForm();
        navigate(`/${data.slug}`);
        toast.success("Blog edit successful");
      }
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);

//end

export const deleteBlog = createAsyncThunk(
  "/profile/deleteBlog",
  async (body, { rejectWithValue }) => {
    const { blogId, setRemove } = body;
    try {
      const { data, status } = await api.deleteBlog(blogId);
      if (status === 200) {
        setRemove(false);
        toast.success("Blog deleted successfully");
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

export const getRelatedTags = createAsyncThunk(
  "/relatedTags/getRelatedTags",
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
