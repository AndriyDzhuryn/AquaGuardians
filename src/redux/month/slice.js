import { createSlice } from '@reduxjs/toolkit';

import { apiGetMonthWater } from './operations.js';

const INITIAL_STATE = {
  waterMonthData: null,
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.month.isLoading = true;
  state.month.error = null;
};

const handleRejected = (state, action) => {
  state.month.isLoading = false;
  state.month.error = action.payload;
};

const waterMonthSlice = createSlice({
  name: 'waterMonth',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(apiGetMonthWater.pending, handlePending)
      .addCase(apiGetMonthWater.fulfilled, (state, action) => {
        state.month.isLoading = false;
        state.month.waterMonthData = action.payload;
      })
      .addCase(apiGetMonthWater.rejected, handleRejected),
});

export const waterMonthReducer = waterMonthSlice.reducer;
