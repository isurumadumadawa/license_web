import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getRulesService } from "../../Services/RuleAPI";

const initialState = {
  status: "idle",
  rules: [],
};

export const getRules = createAsyncThunk("rule/get", async () => {
  const response = await getRulesService();
  return response.data;
});

export const driverSlice = createSlice({
  name: "rule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRules.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRules.fulfilled, (state, action) => {
        state.status = "idle";
        state.rules = action?.payload;
      })
      .addCase(getRules.rejected, (state) => {
        state.status = "failed";
        state.rules = [];
      });
  },
});

export const selectRules = (state) => state.rule.rules;

export default driverSlice.reducer;
