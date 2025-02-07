import { createSlice } from '@reduxjs/toolkit';

import { apiGetTodayWater } from './operations.js';

const INITIAL_STATE = {
  waterTodayData: { percentage: null, records: [] },
  isLoading: false,
  error: null,
};

const waterTodaySlice = createSlice({
  name: 'waterToday',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(apiGetTodayWater.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetTodayWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterTodayData = action.payload.data;
      })
      .addCase(apiGetTodayWater.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const waterTodayReducer = waterTodaySlice.reducer;
