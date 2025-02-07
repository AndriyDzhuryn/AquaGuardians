import { createSlice } from '@reduxjs/toolkit';

import { apiGetMonthWater } from './operations.js';

const INITIAL_STATE = {
  waterMonthData: [],
  isLoading: false,
  error: null,
};

const waterMonthSlice = createSlice({
  name: 'waterMonth',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(apiGetMonthWater.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetMonthWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterMonthData = action.payload.data;
      })
      .addCase(apiGetMonthWater.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const waterMonthReducer = waterMonthSlice.reducer;
