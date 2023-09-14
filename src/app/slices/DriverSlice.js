import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notifications } from "@mantine/notifications";

import {
  createDriverService,
  getDriversService,
  getDriverService,
} from "../../Services/DriverAPI";

const initialState = {
  status: "idle",
  createdDriver: {
    uuid: "",
    userName: "",
    roleId: "",
    updatedAt: "",
    createdAt: "",
  },
  drivers: [],
  driver: {},
};

export const createDriver = createAsyncThunk(
  "driver/create",
  async ({
    userName,
    password,
    name,
    otherName,
    dob,
    mobileNumber,
    gender,
    bloodType,
    address,
    image,
    issuedDate,
    expireDate,
    vehicles,
  }) => {
    const response = await createDriverService({
      userName,
      password,
      name,
      otherName,
      dob,
      mobileNumber,
      gender,
      bloodType,
      address,
      image,
      issuedDate,
      expireDate,
      vehicles,
    });
    return response.data;
  }
);

export const getDrivers = createAsyncThunk("driver/getAll", async () => {
  const response = await getDriversService();
  return response.data;
});

export const getDriver = createAsyncThunk("driver/get", async ({ uuid }) => {
  const response = await getDriverService({ uuid });
  return response.data;
});

export const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {
    copyDriver: (state, action) => {
      state.status = "idle";
      state.driver = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDriver.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDriver.fulfilled, (state, action) => {
        state.status = "idle";
        state.createdDriver = action?.payload;

        notifications.show({
          title: "Successful !",
          message: "Driver Created",
          color: "green",
        });
      })
      .addCase(createDriver.rejected, (state) => {
        notifications.show({
          title: "Something Wrong !",
          message: "Can't Create Driver",
          color: "red",
        });
        state.status = "failed";
        state.createdDriver = {
          uuid: "",
          userName: "",
          roleId: "",
          updatedAt: "",
          createdAt: "",
        };
      })
      .addCase(getDrivers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDrivers.fulfilled, (state, action) => {
        state.status = "idle";
        state.drivers = action?.payload;
      })
      .addCase(getDrivers.rejected, (state) => {
        state.status = "failed";
        state.drivers = [];
      })
      .addCase(getDriver.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDriver.fulfilled, (state, action) => {
        state.status = "idle";
        state.driver = action?.payload;
      })
      .addCase(getDriver.rejected, (state) => {
        state.status = "failed";
        state.driver = {};
      });
  },
});

export const selectCreatedDriver = (state) => state.driver.createdDriver;
export const selectDrivers = (state) => state.driver.drivers;
export const selectDriver = (state) => state.driver.driver;

export const { copyDriver } = driverSlice.actions;

export default driverSlice.reducer;
