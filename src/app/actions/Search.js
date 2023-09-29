import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const search = createAsyncThunk(
  "/search/search",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await api.Search(query);
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
