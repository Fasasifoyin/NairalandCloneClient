import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { toast } from "react-hot-toast";
import { LOGOUT } from "../slice/UserSlice";
import { errorHandler } from "../error";

export const signUp = createAsyncThunk(
  "/user/signUp",
  async (form, { rejectWithValue }) => {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      googleAccessToken,
    } = form;
    try {
      const { data, status } = await api.signUp({
        firstName,
        lastName,
        userName,
        email,
        password,
        googleAccessToken,
      });

      if (status === 201) {
        toast.success(`Welcome ${data.firstName} ${data.lastName}`);
        localStorage.setItem("nairalandUser", JSON.stringify(data));
      }

      return data;
    } catch (error) {
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);

export const login = createAsyncThunk(
  "/user/login",
  async (data, { rejectWithValue }) => {
    const { userName, password, remember, googleAccessToken } = data;
    try {
      const { data, status } = await api.signIn({
        userName,
        password,
        googleAccessToken,
      });

      if (status === 200) {
        toast.success(`Welcome back ${data.firstName} ${data.lastName}`);
        localStorage.setItem("nairalandUser", JSON.stringify(data));
        if (remember) {
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
      const errorMessage = errorHandler({ error, toast: true });
      return rejectWithValue(errorMessage);
    }
  }
);

export const profile = createAsyncThunk(
  "/profile/profile",
  async (userName, { rejectWithValue }) => {
    try {
      const { data } = await api.profile(userName);
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

export const updatePhoto = createAsyncThunk(
  "/profile/updatePhoto",
  async (body, { rejectWithValue }) => {
    try {
      const { userName, file, setFile } = body;
      const { data, status } = await api.updatePhoto({ userName, file });
      if (status === 200) {
        setFile("");
      }
      toast.success(`Photo updated successfully`);
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

export const updateProfile = createAsyncThunk(
  "/profile/updateProfile",
  async (body, { rejectWithValue }) => {
    try {
      const { navigate, setEdit } = body;
      const { data, status } = await api.updateProfile(body);
      if (status === 200) {
        setEdit(false);
        if (body.user !== data.userName) {
          navigate(`/profile/${data.userName}`);
        }
        toast.success("Profile updated successfully");
      }
      return data;
    } catch (error) {
      console.log(error);
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(outputError);
      return rejectWithValue(outputError);
    }
  }
);

export const updateAddress = createAsyncThunk(
  "/profile/updateAddress",
  async (body, { rejectWithValue }) => {
    try {
      const { setEdit } = body;
      const { data, status } = await api.updateAddress(body);
      if (status === 200) {
        setEdit(false);
        toast.success("Address updated successfully");
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

export const deleteUser = createAsyncThunk(
  "/profile/deleteUser",
  async (body, { rejectWithValue }) => {
    const { navigate, dispatch, setRemove } = body;
    try {
      const { data, status } = await api.deleteUser(body.userName);
      if (status === 200) {
        setRemove(false);
        navigate("/");
        dispatch(LOGOUT());
        toast.success(data.message);
      }
      return data;
    } catch (error) {
      setRemove(false);
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(outputError);
      return rejectWithValue(outputError);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "/profile/updatePassword",
  async (body, { rejectWithValue }) => {
    try {
      const { setPassword } = body;
      const { data, status } = await api.updatePassword(body);
      if (status === 200) {
        setPassword(false);
        toast.success(data.message);
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

export const generateotp = createAsyncThunk(
  "/reset/generateotp",
  async (body, { rejectWithValue }) => {
    try {
      const { setSteps, setNumber } = body;
      const { data, status } = await api.verifyEmailandGenerateOTP(body.email);
      if (status === 200) {
        toast.success(data.message);
        setSteps(2);
        setNumber(60);
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

export const verifyotp = createAsyncThunk(
  "/reset/verifyotp",
  async (body, { rejectWithValue }) => {
    try {
      const { setSteps } = body;
      const { data, status } = await api.verifyotp(body.code);
      if (status === 200) {
        toast.success(data.message);
        setSteps(3);
      }
      return data;
    } catch (error) {
      console.log(error);
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(outputError);
      return rejectWithValue(outputError);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "/reset/resetPassword",
  async (body, { rejectWithValue }) => {
    try {
      const { data, status } = await api.resetPassword(body);
      if (status === 201) {
        toast.success(data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
      const outputError =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      toast.error(outputError);
      return rejectWithValue(outputError);
    }
  }
);
