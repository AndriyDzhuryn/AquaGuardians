import { createSlice } from '@reduxjs/toolkit';

import { apiGetTodayWater } from './operations.js';

const INITIAL_STATE = {
  waterTodayData: null,
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.today.isLoading = true;
  state.today.error = null;
};

const handleRejected = (state, action) => {
  state.today.isLoading = false;
  state.today.error = action.payload;
};

const waterTodaySlice = createSlice({
  name: 'waterToday',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(apiGetTodayWater.pending, handlePending)
      .addCase(apiGetTodayWater.fulfilled, (state, action) => {
        state.today.isLoading = false;
        state.today.waterTodayData = action.payload;
      })
      .addCase(apiGetTodayWater.rejected, handleRejected),
});

export const waterTodayReducer = waterTodaySlice.reducer;
