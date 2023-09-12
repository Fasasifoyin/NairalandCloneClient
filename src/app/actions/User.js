import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "react-hot-toast";

export const signUp = createAsyncThunk(
  "/user/signUp",
  async (formData, { rejectWithValue }) => {
    const { firstName, lastName, userName, email, password, navigate } =
      formData;
    try {
      const { data, status } = await api.signUp({
        firstName,
        lastName,
        userName,
        email,
        password,
      });
      if (status === 201) {
        localStorage.setItem("nairalandUser", JSON.stringify(data));
        toast.success(`Welcome ${data.firstName} ${data.lastName}`);
        navigate("/");
      }
      return data;
    } catch (error) {
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(outputError);
      return rejectWithValue(outputError);
    }
  }
);

export const login = createAsyncThunk(
  "/user/login",
  async (formData, { rejectWithValue }) => {
    const { userName, password, navigate, remember, redirect } = formData;
    try {
      const { data, status } = await api.signIn({
        userName,
        password,
      });
      if (status === 200) {
        localStorage.setItem("nairalandUser", JSON.stringify(data));
        toast.success(`Welcome back ${data.firstName} ${data.lastName}`);
        navigate(redirect);
        if (remember.length > 0) {
          localStorage.setItem(
            "rememberUser",
            JSON.stringify({ userName, password })
          );
        } else {
          localStorage.getItem("rememberUser") &&
            localStorage.removeItem("rememberUser");
        }
      }
      return data;
    } catch (error) {
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(outputError);
      return rejectWithValue(outputError);
    }
  }
);
