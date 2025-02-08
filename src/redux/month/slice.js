import { createSlice } from '@reduxjs/toolkit';

import { apiGetMonthWater } from './operations.js';

const INITIAL_STATE = {
  waterMonthData: null,
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

const waterMonthSlice = createSlice({
  name: 'waterMonth',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(apiGetMonthWater.pending, handlePending)
      .addCase(apiGetMonthWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterMonthData = action.payload;
      })
      .addCase(apiGetMonthWater.rejected, handleRejected),
});

export const waterMonthReducer = waterMonthSlice.reducer;
