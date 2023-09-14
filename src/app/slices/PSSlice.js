import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPSService } from "../../Services/PSAPI";

const initialState = {
  status: "idle",
  stations: [],
};

export const getStations = createAsyncThunk("stations/get", async () => {
  const response = await getPSService();
  return response.data;
});

export const driverSlice = createSlice({
  name: "station",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStations.fulfilled, (state, action) => {
        state.status = "idle";
        state.stations = action?.payload;
      })
      .addCase(getStations.rejected, (state) => {
        state.status = "failed";
        state.stations = [];
      });
  },
});

export const selectStations = (state) => state.station.stations;

export default driverSlice.reducer;
