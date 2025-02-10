import { createSlice } from '@reduxjs/toolkit';

import { apiGetTodayWater } from './operations.js';

const INITIAL_STATE = {
  waterTodayData: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const waterTodaySlice = createSlice({
  name: 'waterToday',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(apiGetTodayWater.pending, handlePending)
      .addCase(apiGetTodayWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterTodayData = action.payload.data;
      })
      .addCase(apiGetTodayWater.rejected, handleRejected),
});

export const waterTodayReducer = waterTodaySlice.reducer;
