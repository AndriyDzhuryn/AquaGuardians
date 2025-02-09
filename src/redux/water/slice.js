import { createSlice } from '@reduxjs/toolkit';

import { getWater, addWater } from './operations.js';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    items: null,
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(getWater.pending, handlePending)
      .addCase(getWater.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(getWater.rejected, handleRejected)

      .addCase(addWater.pending, handlePending)
      .addCase(addWater.rejected, handleRejected)
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      });
  },
});

export const waterReducer = waterSlice.reducer;
