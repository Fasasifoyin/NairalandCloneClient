import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { errorHandler } from "../error";

export const search = createAsyncThunk(
  "/search/search",
  async (query, { rejectWithValue }) => {
    try {
      console.log(query);
      const { data } = await api.Search(query);
      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error });
      return rejectWithValue(errorMessage);
    }
  }
);
