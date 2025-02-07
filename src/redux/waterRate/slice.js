import { createSlice } from '@reduxjs/toolkit';

import { apiGetWaterRate, editWaterRate } from './operations.js';

const INITIAL_STATE = {
  userData: {
    waterRate: null,
  },
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
  name: 'waterRate',
  initialState: INITIAL_STATE,
  extraReducers: builder =>
    builder
      .addCase(apiGetWaterRate.pending, handlePending)
      .addCase(apiGetWaterRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload.data;
      })
      .addCase(apiGetWaterRate.rejected, handleRejected)

      .addCase(editWaterRate.pending, handlePending)
      .addCase(editWaterRate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        //
        //
        //
      })
      .addCase(editWaterRate.rejected, handleRejected),
});

export const waterTodayReducer = waterTodaySlice.reducer;
