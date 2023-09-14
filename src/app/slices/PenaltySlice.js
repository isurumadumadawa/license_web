import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPenaltyService } from "../../Services/PenaltyAPI";

const initialState = {
  status: "idle",
  penalties: [],
};

export const getPenalties = createAsyncThunk(
  "penalty/get",
  async ({ driverId }) => {
    const response = await getPenaltyService({ driverId });
    return response.data;
  }
);

export const penaltySlice = createSlice({
  name: "panelty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPenalties.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPenalties.fulfilled, (state, action) => {
        state.status = "idle";
        state.penalties = action?.payload;
      })
      .addCase(getPenalties.rejected, (state) => {
        state.status = "failed";
        state.penalties = [];
      });
  },
});

export const selectPenalty = (state) => state.penalty.penalties;

export default penaltySlice.reducer;
