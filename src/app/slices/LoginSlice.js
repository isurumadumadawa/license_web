import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";

import { loginService } from "../../Services/LoginAPI";

const initialState = {
  status: "idle",
  user: {
    token: "",
    userId: "",
    userName: "",
    roleId: "",
    role: "",
  },
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ userName, password }) => {
    const response = await loginService({ userName, password });
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.setItem("token", "");
      sessionStorage.setItem("userId", "");
      sessionStorage.setItem("userName", "");
      sessionStorage.setItem("roleId", "");
      sessionStorage.setItem("role", "");
      state.status = "idle";
      state.user = {
        token: "",
        userId: "",
        userName: "",
        roleId: "",
        role: "",
      };
    },
    getUserFromLocalStorage: (state) => {
      if (
        sessionStorage.getItem("token") &&
        sessionStorage.getItem("userId") &&
        sessionStorage.getItem("userName") &&
        sessionStorage.getItem("roleId") &&
        sessionStorage.getItem("role")
      ) {
        state.status = "idle";
        state.user = {
          token: sessionStorage.getItem("token"),
          userId: sessionStorage.getItem("userId"),
          userName: sessionStorage.getItem("userName"),
          roleId: sessionStorage.getItem("roleId"),
          role: sessionStorage.getItem("role"),
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action?.payload?.data;

        sessionStorage.setItem("token", action?.payload?.data?.token);
        sessionStorage.setItem("userId", action?.payload?.data?.userId);
        sessionStorage.setItem("userName", action?.payload?.data?.userName);
        sessionStorage.setItem("roleId", action?.payload?.data?.roleId);
        sessionStorage.setItem("role", action?.payload?.data?.role);
      })
      .addCase(login.rejected, (state) => {
        notifications.show({
          title: "Something Wrong !",
          message: "Invalid user name or password",
          color: "red",
        });
        sessionStorage.setItem("token", "");
        sessionStorage.setItem("userId", "");
        sessionStorage.setItem("userName", "");
        sessionStorage.setItem("roleId", "");
        sessionStorage.setItem("role", "");
        state.status = "failed";
        state.user = {
          token: "",
          userId: "",
          userName: "",
          roleId: "",
          role: "",
        };
      });
  },
});

export const selectAuth = (state) => state.auth;
export const { logout, getUserFromLocalStorage } = authSlice.actions;

export default authSlice.reducer;
