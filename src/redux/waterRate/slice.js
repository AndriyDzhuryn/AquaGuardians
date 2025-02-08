import { createSlice } from '@reduxjs/toolkit';
import { updateWaterRate } from './operations';

const handlePending = state => {
  state.waterRate.loading = true;
  state.waterRate.error = null;
};

const handleRejected = (state, action) => {
  state.waterRate.loading = false;
  state.waterRate.error = action.payload;
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
        state.waterRate.loading = false;
        state.waterRate.error = null;
        state.waterRate.waterRate = action.payload.waterRate;
      });
  },
});

export const waterRateReducer = waterRateSlice.reducer;
