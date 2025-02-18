import { createSlice } from '@reduxjs/toolkit';
import { updateWaterRate } from './operations.js';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const waterRateSlice = createSlice({
  name: 'waterRate',
  initialState: {
    waterRate: null,
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(updateWaterRate.pending, handlePending)
      .addCase(updateWaterRate.rejected, handleRejected)
      .addCase(updateWaterRate.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waterRate = action.payload.data;
      });
  },
});

export const waterRateReducer = waterRateSlice.reducer;
